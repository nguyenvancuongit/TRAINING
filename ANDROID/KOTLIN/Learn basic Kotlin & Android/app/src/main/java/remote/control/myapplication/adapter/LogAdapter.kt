package remote.control.myapplication.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.PopupMenu
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import remote.control.myapplication.R
import remote.control.myapplication.db.MoneyTrackerRepo
import remote.control.myapplication.model.LogType
import remote.control.myapplication.model.TaskLog

typealias OnDeleteItem = (task: TaskLog) -> Unit
typealias OnUpdateItem = (task: TaskLog) -> Unit

class LogAdapter(
    private val dataSet: MutableList<TaskLog> = mutableListOf(),
    private val moneyTrackerRepo: MoneyTrackerRepo,
    private val onDeleteItem: OnDeleteItem,
    private val onUpdateItem: OnUpdateItem
    )
    : RecyclerView.Adapter<LogAdapter.LogViewHolder>() {

    @SuppressLint("NotifyDataSetChanged")
    fun setData(dataSet: MutableList<TaskLog>) {
        this.dataSet.clear()
        this.dataSet.addAll(dataSet)
        notifyDataSetChanged()
    }

    inner class LogViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        init {
            itemView.findViewById<FrameLayout>(R.id.btnActionMenu).setOnClickListener {
                showMenuAction(it.context, it)
            }
        }

        fun bind(log: TaskLog) {
            itemView.findViewById<TextView>(R.id.tvTaskName).text = log.name
            if (log.type == LogType.ADD) {
                itemView.findViewById<TextView>(R.id.tvTaskMoney).apply {
                    setTextColor(resources.getColor(android.R.color.holo_green_dark, null))
                    text = String.format("+ " + log.money)
                }
            } else {
                itemView.findViewById<TextView>(R.id.tvTaskMoney).apply {
                    setTextColor(resources.getColor(android.R.color.holo_red_dark, null))
                    text = String.format("- " + log.money)
                }
            }
        }

        private fun showMenuAction(context: Context, anchorView: View) {
            val popupMenu = PopupMenu(context, anchorView)
            popupMenu.apply {
                inflate(R.menu.menu_action_task)
                setOnMenuItemClickListener {
                    when (it.itemId) {
                        R.id.update -> {
                            CoroutineScope(Dispatchers.IO).launch {
                                val task = dataSet[adapterPosition]
                                task.name = "updated name"
                                task.money = 1000
                                task.type = LogType.ADD
                                moneyTrackerRepo.update(task)
                                withContext(Dispatchers.Main) {
                                    dataSet[adapterPosition] = task
                                    notifyItemChanged(adapterPosition)
                                    onUpdateItem(dataSet[adapterPosition])
                                }
                            }
                            true
                        }

                        R.id.delete -> {
                            CoroutineScope(Dispatchers.IO).launch {
                                moneyTrackerRepo.delete(dataSet[adapterPosition].id)
                                withContext(Dispatchers.Main) {
                                    val currentPos = adapterPosition
                                    val task = dataSet[currentPos]

                                    dataSet.removeAt(currentPos)
                                    notifyItemRemoved(currentPos)
                                    onDeleteItem(task)
                                }
                            }
                            true
                        }

                        else -> {
                            false
                        }
                    }
                }
            }.also {
                popupMenu.show()
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LogAdapter.LogViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.adapter_log, parent, false)
        return LogViewHolder(view)
    }

    override fun onBindViewHolder(holder: LogAdapter.LogViewHolder, position: Int) {
        holder.bind(dataSet[position])
    }

    override fun getItemCount() = dataSet.size
}