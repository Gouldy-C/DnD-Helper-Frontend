import { createContext,  useContext , useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


export const AlertContext = createContext<AlertContextProps | undefined>(undefined)

export function AlertProvider({children}: {children: JSX.Element | JSX.Element[]}) {
  
  const [alerts, setAlerts] = useState<Alert[]>([])

  function addAlert (type: 'success'|'error'|'warning'|'info', message: string, timeout: number = 10000):void {
    const newAlert: Alert = { id: uuidv4(), message, type }
    
    setAlerts((prevAlerts) => [...prevAlerts, newAlert])

    if (timeout) {
      setTimeout(() => removeAlert(newAlert.id), timeout)
    }
  }

  function removeAlert (id: string):void {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
