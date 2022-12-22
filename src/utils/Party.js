const PartyStatus = localStorage.getItem("partystatus")
        ? JSON.parse(localStorage.getItem("partystatus"))
        : null;


export default PartyStatus;