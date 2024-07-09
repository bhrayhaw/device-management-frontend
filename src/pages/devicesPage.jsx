import DeviceForm from "../components/deviceForm";
import DeviceList from "../components/deviceList";

const DevicesPage = () => {
  return (
    <div>
      <h1>Devices</h1>
      <DeviceForm />
      <DeviceList />
    </div>
  );
};

export default DevicesPage;
