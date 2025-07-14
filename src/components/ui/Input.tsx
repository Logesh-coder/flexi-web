'use client';

import { Eye, EyeOff, LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { forwardRef, useEffect, useRef, useState } from 'react';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });
const TimePicker = dynamic(() => import('react-time-picker'), { ssr: false });

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css';

interface InputProps<T = any> extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  value?: any;
  onChange?: (e: any) => void;
  setValue?: (field: Extract<keyof T, string>, value: any, options?: object) => void;
  name?: Extract<keyof T, string>;
  minDate?: Date;
  maxDate?: Date;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon: Icon,
      label,
      error,
      type,
      className = '',
      value,
      onChange,
      setValue,
      name,
      minDate,
      maxDate,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
          setShowCalendar(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const baseInputClasses = `block w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'
      } dark:${error ? 'border-red-500' : 'border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 ${Icon ? 'pl-10' : 'pl-4'
      } pr-10 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${className}`;

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
                value={value ? new Date(value).toLocaleDateString('en-GB') : ''}
                onClick={() => setShowCalendar((prev) => !prev)}
                placeholder="DD/MM/YYYY"
                className={baseInputClasses}
              />
              {hasMounted && showCalendar && (
                <div className="absolute w-full z-50 mt-2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
                  <Calendar
                    onChange={(date) => {
                      if (date instanceof Date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const formatted = `${year}-${month}-${day}`;
                        if (setValue && name) {
                          setValue(name, formatted, { shouldValidate: true });
                        } else {
                          onChange?.(formatted);
                        }
                        setShowCalendar(false);
                      }
                    }}
                    minDate={minDate}
                    maxDate={maxDate}
                    value={value ? new Date(value) : undefined}
                    className="!w-full dark:!bg-black"
                  />
                </div>
              )}
            </>
          ) : type === 'time' ? (
            hasMounted ? (
              <div
                className={`relative w-full rounded-lg px-4 py-2 ${error
                    ? 'border border-red-500'
                    : 'border border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700`}
              >
                <TimePicker
                  onChange={(time) => {
                    if (setValue && name) {
                      setValue(name, time, { shouldValidate: true });
                    } else {
                      onChange?.(time);
                    }
                  }}
                  value={value || ''}
                  disableClock={false}
                  clearIcon={null}
                  format="HH:mm"
                  className="!w-full dark:!bg-gray-700 !border-none dark:!text-white"
                />
              </div>
            ) : (
              <div className="w-full h-10 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse" />
            )
          ) : (
            <input
              ref={ref}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              value={value}
              onChange={onChange}
              onWheel={(e) => e.currentTarget.blur()}
              className={baseInputClasses}
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
    );
  }
);

export default Input;
