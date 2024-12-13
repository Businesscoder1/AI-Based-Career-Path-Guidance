import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../Common/IconBtn";

export default function Assessment() {
    const navigate = useNavigate();

    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Start Assessment
            </h1>

            {/* Button to start the assessment */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">About Assessment</p>
                    <IconBtn
                        text="Start"
                        onclick={() => {
                            navigate("/dashboard/Assessment-page-1")
                        }}
                    >
                        <FaArrowRight />
                    </IconBtn>
                </div>
                <p className = "text-richblack-5 text-sm font-medium">
                    "Description of the assessment"
                </p>
            </div>

        </>
    );
}
