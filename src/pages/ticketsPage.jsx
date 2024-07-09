import TicketList from "../components/ticketList";
import TicketForm from "../components/ticketForm";

const TicketsPage = () => {
  return (
    <div>
      <h1>Tickets</h1>
      <TicketForm />
      <TicketList />
    </div>
  );
};

export default TicketsPage;
