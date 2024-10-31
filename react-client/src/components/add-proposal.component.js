import React, { useState, useEffect } from "react";
import ProposalDataService from "../services/proposal.service";
import Title from "./Title";
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const AddProposal = ({ text, kind }) => {
  const { id } = useParams(); // useParams로 id 가져오기
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [teamName, setTeamName] = useState("");
  const [member, setMember] = useState("");
  const [thought, setThought] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  console.log(id);
  
  useEffect(() => {
    if (id) {
      const fetchData = kind === "sample" ? ProposalDataService.get : ProposalDataService.s_get;
      fetchData(id)
        .then(response => {
          const data = response.data;
          setTitle(data.title);
          setContent(data.content || "");
          setTeamName(data.teamName || "");
          setMember(data.member || "");
          setThought(data.thought || "");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [id, kind]);

  const saveProposal = () => {
    const formData = new FormData();
    formData.append('title', title);
    if (kind === "sample") {
      formData.append('content', content);
    } else if (kind === "version") {
      formData.append('teamName', teamName);
      formData.append('member', member);
      formData.append('thought', thought);
    }
    if (file) {
      formData.append('file', file);
    }

    const saveFunction = id
      ? (kind === "sample" ? ProposalDataService.update : ProposalDataService.s_update)
      : (kind === "sample" ? ProposalDataService.create : ProposalDataService.s_create);

    saveFunction(id, formData)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProposal = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={kind === "sample" ? "/proposal" : "/proposal/submit"} />;
  }

  return (
    <>
      <Title title={text} />
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>정상적으로 제출되었습니다!</h4>
            <button className="btn btn-success" onClick={newProposal}>
              목록으로
            </button>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
              />
            </div>

            {kind === "sample" && (
              <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                  className="form-control"
                  id="content"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  name="content"
                />
              </div>
            )}

            {kind === "version" && (
              <>
                <div className="form-group">
                  <label htmlFor="teamName">팀명</label>
                  <input
                    type="text"
                    className="form-control"
                    id="teamName"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    name="teamName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="member">팀원</label>
                  <input
                    type="text"
                    className="form-control"
                    id="member"
                    required
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    name="member"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="thought">소감문</label>
                  <textarea
                    className="form-control"
                    id="thought"
                    required
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    name="thought"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="file">파일 첨부</label>
              <input
                type="file"
                className="form-control-file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
              />
            </div>
            <button onClick={saveProposal} className="btn btn-success">
              {id ? "수정하기" : "등록하기"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddProposal;
