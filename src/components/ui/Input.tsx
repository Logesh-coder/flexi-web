import { Eye, EyeOff, LucideIcon } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  label?: string
  error?: string | any
  value?: any
  onChange?: (e: any) => void
  setValue?: (field: string, value: any, options?: object) => void
  name?: string
  minDate?: Date;
  maxDate?: Date | any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, label, error, type, className = '', value, onChange, setValue, name, minDate, maxDate = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)

    const calendarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
          setShowCalendar(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    return (
      <div className="relative" ref={calendarRef}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}

          {type === 'date' ? (
            <>
              <input
                readOnly
                value={value || ''}
                onClick={() => setShowCalendar((prev) => !prev)}
                onWheel={(e) => e.currentTarget.blur()}
                className={`block w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'
                  } dark:${error ? 'border-red-500' : 'border-gray-600'}
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  dark:focus:ring-primary-500 dark:focus:border-primary-500
                  ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2
                  placeholder:text-gray-500 dark:placeholder:text-gray-400
                  ${className}`}
                {...props}
              />
              {showCalendar && (
                <div className="absolute w-full z-50 mt-2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
                  <Calendar
                    onChange={(date, _event) => {
                      if (date) {
                        const selectedDate = new Date(date as any);
                        const formatted = `${selectedDate
                          .getDate()
                          .toString()
                          .padStart(2, '0')}/${(selectedDate.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/${selectedDate.getFullYear()}`;
                        if (setValue && name) {
                          setValue(name, formatted, { shouldValidate: true });
                        } else {
                          onChange?.(formatted);
                        }
                        setShowCalendar(false);
                      }
                    }}
                    className="!w-full dark:!bg-black"
                    minDate={minDate}
                    maxDate={maxDate}
                    value={
                      value
                        ? (() => {
                          const [day, month, year] = value.split('/');
                          return new Date(`${year}-${month}-${day}`);
                        })()
                        : null
                    }
                  />
                </div>
              )}
            </>
          )
            : type === 'time' ? (
              <>
                <div className="relative w-full">
                  <div className="block w-full rounded-lg border 
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    border-gray-300 dark:border-gray-600 
                    focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500
                    px-4 py-2 ${className}"
                  >
                    <TimePicker
                      onChange={(time) => {
                        if (setValue && name) {
                          setValue(name, time, { shouldValidate: true });
                        } else {
                          onChange?.(time);
                        }
                      }}
                      value={value}
                      disableClock={false}
                      clearIcon={null}
                      className="!w-full dark:!bg-gray-700 !border-none dark:!text-white"
                    />
                  </div>
                </div>

              </>
            ) : (
              <input
                ref={ref}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                value={value}
                onChange={onChange}
                onWheel={(e) => e.currentTarget.blur()}
                className={`block w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'
                  } dark:${error ? 'border-red-500' : 'border-gray-600'}
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                dark:focus:ring-primary-500 dark:focus:border-primary-500
                ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                ${className}`}
                {...props}
              />
            )}

          {type === 'password' && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-300"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
        </div>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

export default Input
