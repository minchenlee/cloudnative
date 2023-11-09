function StatusDot(props) {
  const status = props.status || "";
  let color = "";

  if (status == "plenty") {
    color = "bg-white"
  }

  if (status == "some") {
    color = "bg-silver"
  }

  if (status == "none") {
    color = "bg-dark-gray"
  }

  return (
    <div className={`w-[30px] h-[30px] rounded-full ${color} border-1 border-silver shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.25)]`}></div>
  );
}

export default StatusDot;
