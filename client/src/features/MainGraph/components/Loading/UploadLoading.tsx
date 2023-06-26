import NavBar from "@/features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import { BiLoader } from "react-icons/bi";

interface UploadLoadingProps {
  imgNum: number;
}

const UploadLoading = ({ imgNum }: UploadLoadingProps) => {
  return (
    <div className="bg-gray-100 h-screen">
      <NavBar />
      <Wrapper>
        <div
          className="flex flex-col items-center py-15 px-0 gap-4 self-stretch bg-gray-100"
          style={{
            padding: "3.75rem 0",
          }}
        >
          <div className="flex justify-center items-center space-x-3 ">
            <BiLoader
              className="text-base leading-none"
              style={{ fontFamily: "xeicon" }}
            />
            <p className="text-gray-900 text-xl font-semibold leading-tight tracking-tighter">
              분석 중인 스크린샷 {imgNum} ...
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center self-stretch bg-gray-100">
          <div className="flex items-center justify-center w-[60rem] h-[27.5rem] px-[3.75rem] py-[7.5rem] rounded-xl border border-gray-100 bg-white">
            <div className="flex items-center justify-center gap-4 w-[14.5rem] h-[14.5rem] flex-shrink-0 rounded-md border border-gray-100 bg-gray-50">
              {/* <img
                src=""
                className="flex-1 self-stretch bg-lightgray bg-contain bg-no-repeat"
              /> */}
            </div>
            <div className="flex items-start content-start gap-y-[0.5rem] gap-x-[0.25rem] h-[14.5rem] py-[0.5rem] px-1 justify-center flex-wrap">
              태그들
            </div>
            <div className="flex flex-col w-[14.5rem] h-[14.5rem] justify-center shrink-0 text-gray-900 text-center text-2xl font-semibold leading-6 tracking-tighter">
              추출 태그
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 flex-1 self-stretch h-[10.125rem] bg-gray-100">
          <p className="text-gray-800 text-base font-light leading-6 tracking-tighter">
            갤러리 속 숨겨진 인사이트를 발견하세요
          </p>
          <p className="flex items-center justify-center w-[8.03944rem] h-5">
            insightLINK
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default UploadLoading;
