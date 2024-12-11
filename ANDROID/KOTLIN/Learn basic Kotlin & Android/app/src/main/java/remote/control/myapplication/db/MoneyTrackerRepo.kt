package remote.control.myapplication.db

import android.content.ContentValues
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import remote.control.myapplication.model.LogType
import remote.control.myapplication.model.TaskLog

class MoneyTrackerRepo(private val moneyTrackerDB: MoneyTrackerDB) {
    companion object {
        fun create(moneyTrackerDB: MoneyTrackerDB): MoneyTrackerRepo {
            return MoneyTrackerRepo(moneyTrackerDB)
        }
    }

    suspend fun insert(taskLog: TaskLog) = withContext(Dispatchers.IO) {
        val database = moneyTrackerDB.writableDatabase

        ContentValues().apply {
            put(DbConfig.Task.COL_TASK_NAME, taskLog.name)
            put(DbConfig.Task.COL_MONEY, taskLog.money.toString())
            put(DbConfig.Task.COL_TYPE, taskLog.type.toString())
        }.also {
            database.insert(DbConfig.Task.TABLE_NAME, null, it)
        }
    }

    suspend fun selectAll() = withContext(Dispatchers.IO) {
        val database = moneyTrackerDB.readableDatabase

        val cursor = database.query(
            true, DbConfig.Task.TABLE_NAME,
            arrayOf(
                DbConfig.Task.COL_ID,
                DbConfig.Task.COL_TASK_NAME,
                DbConfig.Task.COL_MONEY,
                DbConfig.Task.COL_TYPE,
            ),
            null, null, null, null, null, null
        )

        val result = mutableListOf<TaskLog>()
        cursor?.let {
            if (cursor.moveToFirst()) {
                do {
                    val idIndex = cursor.getColumnIndex(DbConfig.Task.COL_ID)
                    val idTaskName = cursor.getColumnIndex(DbConfig.Task.COL_TASK_NAME)
                    val idMoney = cursor.getColumnIndex(DbConfig.Task.COL_MONEY)
                    val idType = cursor.getColumnIndex(DbConfig.Task.COL_TYPE)

                    result.add(
                        TaskLog(
                            id = cursor.getInt(idIndex),
                            name = cursor.getString(idTaskName),
                            money = cursor.getInt(idMoney),
                            type = LogType.valueOf(cursor.getString(idType))
                        )
                    )
                } while (cursor.moveToNext())
            }
        }

        result
    }

    suspend fun delete(id: Int) = withContext(Dispatchers.IO) {
        val database = moneyTrackerDB.writableDatabase
        database.delete(DbConfig.Task.TABLE_NAME, "_id = $id", null) > 0
    }

    suspend fun update(taskLog: TaskLog) = withContext(Dispatchers.IO) {
        val database = moneyTrackerDB.writableDatabase

        ContentValues().apply {
            put(DbConfig.Task.COL_TASK_NAME, taskLog.name)
            put(DbConfig.Task.COL_MONEY, taskLog.money.toString())
            put(DbConfig.Task.COL_TYPE, taskLog.type.toString())
        }.also {
            database.update(DbConfig.Task.TABLE_NAME, it, "_id = ${taskLog.id}", null)
        }
    }
}