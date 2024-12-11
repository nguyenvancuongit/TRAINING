package remote.control.myapplication.helper

import android.content.Context
import android.content.SharedPreferences
import remote.control.myapplication.model.LogType

class SharePref {
    companion object {
        private const val PREF_FILE_NAME = "com.myapplication.sharepref"
        fun create(context: Context): SharedPreferences = context.getSharedPreferences(PREF_FILE_NAME, Context.MODE_PRIVATE)

        enum class OPERATION {
            PLUS,
            MINUS
        }
        fun calculateTrackingMoney(context: Context, logType: LogType, money: Int, operation: OPERATION) {
            if (logType == LogType.ADD) {
                val currentMoney = create(context).get("MONEY_ADD", 0) as Int
                if (operation == OPERATION.PLUS) {
                    create(context).put("MONEY_ADD", currentMoney + money)
                } else {
                    create(context).put("MONEY_ADD", currentMoney - money)
                }
            } else {
                val currentMoney = create(context).get("MONEY_SUBTRACT", 0) as Int
                if (operation == OPERATION.PLUS) {
                    create(context).put("MONEY_SUBTRACT", currentMoney + money)
                } else {
                    create(context).put("MONEY_SUBTRACT", currentMoney - money)
                }
            }
        }
    }
}

inline fun <reified T> SharedPreferences.get(key: String, defaultValue: T) = with(this) {
    when (T::class) {
        Boolean::class -> getBoolean(key, defaultValue as Boolean) as T
        Float::class -> getFloat(key, defaultValue as Float) as T
        Int::class -> getInt(key, defaultValue as Int) as T
        Long::class -> getLong(key, defaultValue as Long) as T
        String::class -> getString(key, defaultValue as String) as T
        else -> {
            null
        }
    }
}

inline fun <reified T> SharedPreferences.put(key: String, value: T) = with(this.edit()) {
    when (T::class) {
        Boolean::class -> putBoolean(key, value as Boolean)
        Float::class -> putFloat(key, value as Float)
        Int::class -> putInt(key, value as Int)
        Long::class -> putLong(key, value as Long)
        String::class -> putString(key, value as String)
    }
    commit()
}