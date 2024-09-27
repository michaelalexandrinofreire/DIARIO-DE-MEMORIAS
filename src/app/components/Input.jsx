export default function Input({ placeholder = "preencher", Id, Name, onChange, type = "text" }) {
  return (
    <input
      className="py-1 px-2 rounded-[10px] w-96 bg-bgProject border-[#616161] border"
      type={type}
      id={Id}
      name={Name}
      placeholder={placeholder}
      required
      onChange={onChange}
    />
  );
}
