interface Props {
  label: string;
  selected?: boolean;
  onSelect: () => any;
}

export const TabBarItem = ({ label, selected = false, onSelect }: Props) => {
  return (
    <div onClick={onSelect}>
      <input
        checked={selected}
        onChange={() => {}}
        type="radio"
        className="peer hidden"
      />
      <label className="transition-all  block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
        {label}
      </label>
    </div>
  );
};
