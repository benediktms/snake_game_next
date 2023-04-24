import { WASMContext } from "@/context/wasm_context_provider";
import { useContext } from "react";

export const WasmExample = () => {
  const ctx = useContext(WASMContext);

  if (!ctx.wasm) {
    return <>...</>;
  }

  return (
    <div className="text-white">
      Computed from WASM: 4+3={ctx.wasm.add(4, 3)}
    </div>
  );
};
