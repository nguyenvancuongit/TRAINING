package remote.control.myapplication.ui

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import remote.control.myapplication.R
import remote.control.myapplication.adapter.LogAdapter
import remote.control.myapplication.databinding.ActivityMainXmlBinding
import remote.control.myapplication.db.MoneyTrackerDB
import remote.control.myapplication.db.MoneyTrackerRepo
import remote.control.myapplication.helper.SharePref
import remote.control.myapplication.helper.get
import remote.control.myapplication.model.LogType
import remote.control.myapplication.model.TaskLog
import kotlin.coroutines.CoroutineContext

class MainXMLActivity : AppCompatActivity(), CoroutineScope {
    private lateinit var binding: ActivityMainXmlBinding

    private val job = Job()
    override val coroutineContext: CoroutineContext
        get() = job + Dispatchers.Main

    private val moneyTrackerRepo: MoneyTrackerRepo by lazy {
        val moneyTrackerDB = MoneyTrackerDB(applicationContext)
        MoneyTrackerRepo.create(moneyTrackerDB)
    }

    private lateinit var logAdapter: LogAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainXmlBinding.inflate(layoutInflater)
        setContentView(binding.root)

        title = "Home"

        val linearLayoutManager = LinearLayoutManager(applicationContext)
        val decoration = DividerItemDecoration(this, linearLayoutManager.orientation)

        ContextCompat.getDrawable(this, R.drawable.bg_divider)

        logAdapter = LogAdapter(
            moneyTrackerRepo = moneyTrackerRepo,
            onDeleteItem = {
                SharePref.calculateTrackingMoney(this, it.type, it.money, SharePref.Companion.OPERATION.MINUS)

                showEmptyTasks()
                showTrackMoney()
            },
            onUpdateItem = {

            }
        )

        binding.recyclerView.apply {
            layoutManager = linearLayoutManager
            addItemDecoration(decoration)
            adapter = logAdapter
        }

        loadTasks(true)
    }

    private fun loadTasks(isDelayed: Boolean = false) {
        launch {
            if (isDelayed) {
                delay(2000L)
            }
            val listTasks = moneyTrackerRepo.selectAll()

            withContext(Dispatchers.Main) {
                if (listTasks.isEmpty()) {
                    showEmptyTasks()
                } else {
                    displayTasks(listTasks)
                }
                showTrackMoney()
            }
        }
    }

    private fun showTrackMoney() {
        binding.tvPlus.text = SharePref.create(this).get("MONEY_ADD", 0).toString()
        binding.tvMinus.text = SharePref.create(this).get("MONEY_SUBTRACT", 0).toString()
    }

    private fun showEmptyTasks() {
        binding.pbLoading.visibility = View.GONE
        binding.tvStatus.visibility = View.VISIBLE
        binding.tvStatus.text = "Empty !!!"
    }

    private fun displayTasks(listTask: MutableList<TaskLog>) {
        binding.pbLoading.visibility = View.GONE
        binding.tvStatus.visibility = View.GONE
        logAdapter.setData(listTask)
    }

    private fun mockLog(): MutableList<TaskLog> {
        val result = mutableListOf<TaskLog>()
        for (i in 1..100) {
            if (i % 2 == 0) {
                result.add(
                    TaskLog(
                        id = i,
                        name = "name $i",
                        money = 200 * i,
                        type = LogType.ADD
                    )
                )
            } else {
                result.add(
                    TaskLog(
                        id = i,
                        name = "name $i",
                        money = 200 * i,
                        type = LogType.SUBTRACT
                    )
                )
            }
        }

        return result
    }

    override fun onDestroy() {
        super.onDestroy()
        job.cancel()
    }

    private val resultLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            loadTasks()
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == R.id.addTaskLog) {
            val intent = Intent(this, AddTaskLogActivity::class.java)
            resultLauncher.launch(intent)
            return true
        }
        return super.onOptionsItemSelected(item)
    }
}