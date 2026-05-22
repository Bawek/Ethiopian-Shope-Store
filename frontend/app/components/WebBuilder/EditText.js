import React from 'react'
import Padding from "./Padding";
import Style from "./RightSidbar.module.css";
function EditText() {
  return (
    <div className=" flex flex-col items-center gap-2">
    <h3 className=" font-bold">Content</h3>
    <textarea
        rows={2}
        className={Style.input}
        type="text"
        placeholder="edit here"
    ></textarea>
    <button className={Style.btn}>change text</button>
    <h2 className=" text-center">styles</h2>
    <div className=" bg-black w-full my-2 h-1"></div>
    <div className=" flex flex-col items-start   w-full">
        <div className=" flex flex-col">
            <h3>Margin in (px)</h3>
            <div className=" flex text-black gap-2">
                <div>
                    <input
                        type="number"
                        className=" w-16"
                        name="margin"
                        id="margin"
                    />
                    <button className=" text-center w-full">Left</button>
                </div>
                <div>
                    <input
                        type="number"
                        className=" w-16"
                        name="margin"
                        id="margin"
                    />
                    <button className=" text-center w-full">Right</button>
                </div>
                <div>
                    <input
                        type="number"
                        className=" w-16"
                        name="margin"
                        id="margin"
                    />
                    <button className=" text-center w-full">Top</button>
                </div>
                <div>
                    <input
                        type="number"
                        className=" w-16"
                        name="margin"
                        id="margin"
                    />
                    <button className=" text-center w-full">Bottom</button>
                </div>
            </div>
        </div>
        <button>postion</button>
        <div className="flex flex-col">
            <Padding />
        </div>
        <div className=" flex justify-between w-full pr-4 mt-3">
            {" "}
            Text Size{" "}
            <input
                type="number"
                placeholder="Text Size"
                name="textSize"
                value={16}
                id="textSize"
                className=" w-16 text-black h-3"
            />{" "}
        </div>
        <label htmlFor="color">
            color{" "}
            <input
                id="color"
                name="color"
                className="w-3 h-3"
                type="color"
                placeholder="color"
            />
        </label>
    </div>
</div>
  )
}

export default EditText