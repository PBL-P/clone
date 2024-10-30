import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/Menu";
import AddProposal from "./components/add-proposal.component";
import Proposal from "./pages/Proposal/Proposal";
import DesignPage from "./pages/Design";
import Content from "./components/Content";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GlobalStyle from './GlobalStyles';
import Main from "./pages/Main/Main";
import Benefit from "./pages/Main/Benefit";
import Method from "./pages/Main/Method";
import Video from "./pages/Main/Video";
import ProposalSubmit from "./pages/Proposal/ProposalSubmit";


class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <div style={{ display: 'flex' }}>
          <Menu />
          <Content>
            {/* Routes는 Router로 감싸져 있으므로 바로 사용 가능 */}
            <Routes>
            <Route path="/" element={<Main />}/>
              <Route path="/main" element={<Main />}/>
              <Route path="/main/benefit" element={<Benefit />}/>
              <Route path="/main/method" element={<Method />}/>
              <Route path="/main/video" element={<Video />}/>
              <Route path="/proposal" element={<Proposal />} />
              <Route path="/proposal/register" element={<AddProposal text="제안서 - 작성 방법 및 예시" kind="sample" />} />
              <Route path="/proposal/submit" element={<ProposalSubmit />} />
              <Route path="/proposal/submit/register" element={<AddProposal text="제안서 - 제출 버전 관리" kind="version"/>} />
              <Route path="/design" element={<DesignPage />} />
              <Route path="/design/submit" element={<AddProposal text="설계서 - 작성 방법 및 예시" />} />
            </Routes>
          </Content>
        </div>
      </>
    );
  }
}
//dev->be 장선
export default App;
