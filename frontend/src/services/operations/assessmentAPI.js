import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { setLoading , setdomainData} from "../../slices/assessmentSlice"
import {assessmentEndpoints} from "../apis"

const {
 SUBMIT_ASSESSMENT_API,
} = assessmentEndpoints

export function submitAssessment(formData,nevigate) {
    return async (dispatch) => {
      console.log("SUBMIT ASSESSMENT API DATA............", formData);
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      
      try {
        const response = await apiConnector("POST",SUBMIT_ASSESSMENT_API ,formData);  
        console.log("SUBMIT ASSESSMENT API RESPONSE............", response);
  
        if (response && response.data && response.data.success) {
          dispatch(setdomainData(response.data.domain.subdomains));
          console.log("SUBMIT ASSESSMENT API RESPONSE............", response.data.domain.subdomains);
          nevigate("/dashboard/Recomendation");
        } else {
          const errorMessage = response?.data?.message || "Unknown error occurred";
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.log("SUBMIT ASSESSMENT API ERROR............", error);
        toast.error(`Could Not Submit Assessment: ${error.message}`);
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
};

