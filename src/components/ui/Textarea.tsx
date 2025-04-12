interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: any
}

export function Textarea({ label, className = '', error, ...props }: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          block w-full rounded-lg border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          dark:focus:ring-primary-500 dark:focus:border-primary-500
          px-4 py-2
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          ${className}
        `}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}