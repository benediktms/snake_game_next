/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WASMContext } from "@/context/wasm_context_provider";
import { useContext, useEffect, useRef } from "react";

export const SnakeCanvas = () => {
  const { wasm } = useContext(WASMContext);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wasm) {
      return;
    }
    const CELL_SIZE = 20;
    const WORLD_SIZE_SQRT = 8;

    const world = wasm.World.new(WORLD_SIZE_SQRT, WORLD_SIZE_SQRT);
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) {
      return;
    }

    canvas.width = WORLD_SIZE_SQRT * CELL_SIZE;
    canvas.height = WORLD_SIZE_SQRT * CELL_SIZE;

    function drawWorld(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();

      for (let x = 0; x < WORLD_SIZE_SQRT + 1; x++) {
        ctx.moveTo(x * CELL_SIZE, 0);
        ctx.lineTo(x * CELL_SIZE, WORLD_SIZE_SQRT * CELL_SIZE);
      }

      for (let y = 0; y < WORLD_SIZE_SQRT + 1; y++) {
        ctx.moveTo(0, y * CELL_SIZE);
        ctx.lineTo(WORLD_SIZE_SQRT * CELL_SIZE, CELL_SIZE * y);
      }

      // FIXME: this is simpler but the top and left edges are missing for some reason
      // for (let x = 0; x < WORLD_SIZE_SQRT; x++) {
      //   for (let y = 0; y < WORLD_SIZE_SQRT; y++) {
      //     ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      //   }
      // }

      ctx.stroke();
    }

    function drawSnake(ctx: CanvasRenderingContext2D) {
      const headIdx = world.snake_head_idx();
      const col = headIdx % WORLD_SIZE_SQRT;
      const row = Math.floor(headIdx / WORLD_SIZE_SQRT);

      console.log({ headIdx, col, row });

      ctx.beginPath();
      ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.stroke();
    }

    drawWorld(ctx);
    drawSnake(ctx);
  }, [wasm]);

  return (
    <div className="m-10 flex flex-col">
      <h2 className="text-center text-3xl">snake</h2>
      <div className="mt-4 flex justify-center">
        <canvas ref={ref}></canvas>
      </div>
    </div>
  );
};
