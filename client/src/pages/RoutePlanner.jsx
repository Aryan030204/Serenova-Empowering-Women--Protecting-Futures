import RouteDetails from "../components/RouteDetails"
import SafeRoute from "../components/SafeRoute"

const RoutePlanner = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center w-full p-2 gap-[5rem]">
      <RouteDetails />
      <SafeRoute />
    </div>
  )
}

export default RoutePlanner
