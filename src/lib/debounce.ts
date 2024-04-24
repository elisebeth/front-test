let timeout: ReturnType<typeof setTimeout> | null = null

export const debounce = (callback: Function, delay: number) => {
  if (timeout !== null) clearTimeout(timeout)

  timeout = setTimeout((): void => {
    callback()
  }, delay)
}
