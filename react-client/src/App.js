import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/Menu";
import AddProposal from "./components/add-proposal.component";
import Content from "./components/Content";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GlobalStyle from './GlobalStyles';

import Main from "./pages/Main/Main";
import Benefit from "./pages/Main/Benefit";
import Method from "./pages/Main/Method";
import Video from "./pages/Main/Video";

import Proposal from "./pages/Proposal/Proposal";
import ProposalSubmit from "./pages/Proposal/ProposalSubmit";
import ProposalDetail from "./pages/Proposal/ProposalDetail";
import ProposalSubmitDetail from "./pages/Proposal/ProposalSubmitDetail";


import Plan from "./pages/Plan/Plan";
import PlanSubmit from "./pages/Plan/PlanSubmit";
import PlanDetail from "./pages/Plan/PlanDetail";

import Design from "./pages/Design/Design";
import DesignSubmit from "./pages/Design/DesignSubmit";
import DesignDetail from "./pages/Design/DesignDetail";

import Report from "./pages/Report/Report";
import ReportSubmit from "./pages/Report/ReportSubmit";
import ReportDetail from "./pages/Report/ReportDetail";

import Announcements from "./pages/Announcement/Announcements";
import AnnouncementDetail from "./pages/Announcement/AnnouncementDetail";
import AddAnnouncement from "./pages/Announcement/AddAnnouncement";
import EditAnnouncement from "./pages/Announcement/EditAnnouncement";


class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <div style={{ display: 'flex' }}>
          <Menu />
          <Content>
            <Routes>

              <Route path="/" element={<Main />} />
              <Route path="/main" element={<Main />} />
              <Route path="/main/benefit" element={<Benefit />} />
              <Route path="/main/method" element={<Method />} />
              <Route path="/main/video" element={<Video />} />

            <Route path="/" element={<Main />}/>
              <Route path="/main" element={<Main />}/>
              <Route path="/main/benefit" element={<Benefit />}/>
              <Route path="/main/method" element={<Method />}/>
              <Route path="/main/video" element={<Video />}/>
              {/* 제안서 부분 시작 */}
                <Route path="/proposal" element={<Proposal />} />
                <Route path="/proposal/:id" element={<ProposalDetail />} />
                <Route path="/proposal/register" element={<AddProposal text="제안서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/proposal/submit" element={<ProposalSubmit />} />
                <Route path="/proposal/submit/register" element={<AddProposal text="제안서 - 제출 버전 관리" kind="version"/>} />
                <Route path="/proposal/submit/:id" element={<ProposalSubmitDetail />} />                
                {/* 제안서 업데이트 */}
                <Route path="/proposal/register/:id" element={<AddProposal text="제안서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/proposal/submit/register/:id" element={<AddProposal text="제안서 - 제출 버전 관리" kind="version" />} />
              {/* 제안서 부분 종료 */}



              {/* 제안서 작성 방법 및 제출 관련 경로 */}
              <Route path="/instructions" element={<Proposal />} />
              <Route path="/instructions/:id" element={<ProposalDetail />} />
              <Route path="/instructions/register" element={<AddProposal text="제안서 - 작성 방법 및 예시" kind="sample" />} />

              {/* 제안서 제출 관련 경로 */}
              <Route path="/submissions" element={<ProposalSubmit />} />
              <Route path="/submissions/register" element={<AddProposal text="제안서 - 제출 버전 관리" kind="version" />} />
              <Route path="/submissions/:id" element={<ProposalDetail />} />          

              {/* 제안서 부분 종료 */}
              
              
              <Route path="/design/submit" element={<AddProposal text="설계서 - 작성 방법 및 예시" />} />

              {/* 기획서 부분 시작 */}
                <Route path="/plan" element={<Plan />} />
                <Route path="/plan/:id" element={<PlanDetail />} />
                <Route path="/plan/register" element={<AddProposal text="기획서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/plan/submit" element={<PlanSubmit />} />
                <Route path="/plan/submit/register" element={<AddProposal text="기획서 - 제출 버전 관리" kind="version"/>} />
                <Route path="/plan/submit/:id" element={<PlanDetail />} />                
                {/* 기획서 업데이트 */}
                <Route path="/plan/register/:id" element={<AddProposal text="기획서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/plan/submit/register/:id" element={<AddProposal text="기획서 - 제출 버전 관리" kind="version" />} />

              {/* 기획서 부분 종료 */}
              
              {/* 설계서 부분 시작 */}
                <Route path="/design" element={<Design />} />
                <Route path="/design/:id" element={<DesignDetail />} />
                <Route path="/design/register" element={<AddProposal text="설계서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/design/submit" element={<DesignSubmit />} />
                <Route path="/design/submit/register" element={<AddProposal text="설계서 - 제출 버전 관리" kind="version"/>} />
                <Route path="/design/submit/:id" element={<DesignDetail />} />                
                {/* 설계서 업데이트 */}
                <Route path="/design/register/:id" element={<AddProposal text="설계서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/design/submit/register/:id" element={<AddProposal text="설계서 - 제출 버전 관리" kind="version" />} />

              {/* 설계서 부분 종료 */}

              {/* 결과 보고서 부분 시작 */}
                <Route path="/report" element={<Report />} />
                <Route path="/report/:id" element={<ReportDetail />} />
                <Route path="/report/register" element={<AddProposal text="결과 보고서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/report/submit" element={<ReportSubmit />} />
                <Route path="/report/submit/register" element={<AddProposal text="결과 보고서 - 제출 버전 관리" kind="version"/>} />
                <Route path="/report/submit/:id" element={<ReportDetail />} />                
                {/* 결과 보고서 업데이트 */}
                <Route path="/report/register/:id" element={<AddProposal text="결과 보고서 - 작성 방법 및 예시" kind="sample" />} />
                <Route path="/report/submit/register/:id" element={<AddProposal text="결과 보고서 - 제출 버전 관리" kind="version" />} />

              {/* 결과 보고서 부분 종료 */}

              {/* 공지사항 관련 라우트 */}
              <Route path="/announcement" element={<Announcements/>} />
              <Route path="/announcement/add" element={<AddAnnouncement/>} />
              <Route path="/announcement/:id" element={<AnnouncementDetail/>} />
              <Route path="/announcement/edit/:id" element={<EditAnnouncement/>}/>
        
            </Routes>
          </Content>
        </div>
      </>
    );
  }
}

export default App;
