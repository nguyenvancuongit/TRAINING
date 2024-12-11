package remote.control.myapplication.ui

import android.app.Activity
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import io.ghyeok.stickyswitch.widget.StickySwitch
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import remote.control.myapplication.databinding.ActivityAddTaskLogBinding
import remote.control.myapplication.db.MoneyTrackerDB
import remote.control.myapplication.db.MoneyTrackerRepo
import remote.control.myapplication.helper.SharePref
import remote.control.myapplication.model.LogType
import remote.control.myapplication.model.TaskLog
import kotlin.coroutines.CoroutineContext

class AddTaskLogActivity : AppCompatActivity(), CoroutineScope {
    private lateinit var binding: ActivityAddTaskLogBinding

    private val job = Job()
    override val coroutineContext: CoroutineContext
        get() = job + Dispatchers.Main

    private val moneyTrackerRepo: MoneyTrackerRepo by lazy {
        val moneyTrackerDB = MoneyTrackerDB(applicationContext)
        MoneyTrackerRepo.create(moneyTrackerDB)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityAddTaskLogBinding.inflate(layoutInflater)
        setContentView(binding.root)

        title = "Add Task"
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        var logType = LogType.ADD
        binding.stickySwitch.setA(object : StickySwitch.OnSelectedChangeListener{
            override fun onSelectedChange(direction: StickySwitch.Direction, text: String) {
                logType = LogType.valueOf(text)
            }
        })

        binding.btnAddTask.setOnClickListener {
            val taskName = binding.edtTaskName.text.toString()
            val money = binding.edtMoney.text.toString()

            launch {
                moneyTrackerRepo.insert(
                    TaskLog(
                        name = taskName,
                        money = money.toInt(),
                        type = logType
                    )
                )

                SharePref.calculateTrackingMoney(this@AddTaskLogActivity, logType, money.toInt(), SharePref.Companion.OPERATION.PLUS)

                setResult(Activity.RESULT_OK)
                finish()
            }
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            finish()
            return true
        }
        return super.onOptionsItemSelected(item)
    }
}