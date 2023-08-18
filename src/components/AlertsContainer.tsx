import { useAlert}  from "../contexts/AlertContext"
import AlertComp from "./AlertComp"


export default function AlertsContainer() {
  const { alerts } = useAlert()


  return (
    <div className = "container absolute w-full px-5 mt-2 top-16">
      {alerts.map((alert) => <AlertComp key={alert.id} alert={alert}/>)}
    </div>
  )
}
