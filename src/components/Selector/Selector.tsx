interface SelectorProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}

const Selector = ({ label, options, onChange }: SelectorProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Envolvemos o select em uma div relative para posicionar a seta */}
      <div className="relative w-full">
        <select
          className="w-full p-2 pl-6 pr-12 text-xl text-[#090129] border border-[#090129] rounded-4xl appearance-none bg-transparent cursor-pointer"
          defaultValue=""
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled className="pl-6">
            {label}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="pl-6">
              {option}
            </option>
          ))}
        </select>

        {/* Ícone da seta: ajuste 'right-6' para aproximar ou afastar da borda */}
        <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
          <svg
            className="w-5 h-5 fill-current text-[#090129]"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Selector;
