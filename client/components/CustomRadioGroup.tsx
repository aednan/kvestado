import { RadioGroup } from "@headlessui/react";

type RadioGroupProps = {
  selected: { id: string; name: string; description: string };
  options: { id: string; name: string; description: string }[];
  setSelected: any;
  clear?: Function;
};

export default function CustomRadioGroup(props: RadioGroupProps) {
  // const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-full px-4 pb-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={props.selected}
          onChange={(v) => {
            props.setSelected(v);
            if (props.clear !== undefined) {
              props.clear();
            }
          }}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {props.options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-800 bg-opacity-75 text-white" : "bg-white"
                  }
                  relative flex cursor-pointer rounded-lg border-2 px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between ">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>{option.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
