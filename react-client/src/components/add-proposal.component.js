import React, { Component } from "react";
import ProposalDataService from "../services/proposal.service";
import Title from "./Title";
import { Navigate } from 'react-router-dom';

export default class AddProposal extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeTeamName = this.onChangeTeamName.bind(this);
    this.onChangeMember = this.onChangeMember.bind(this);
    this.onChangeThought = this.onChangeThought.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.saveProposal = this.saveProposal.bind(this);
    this.newProposal = this.newProposal.bind(this);

    this.state = {
      id: null,
      title: "",
      content: "", // content 필드 추가
      teamName: "",
      member: "",
      thought: "",
      file: null,
      submitted: false,
      redirect: false
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeContent(e) {
    this.setState({ content: e.target.value });
  }

  onChangeTeamName(e) {
    this.setState({ teamName: e.target.value });
  }

  onChangeMember(e) {
    this.setState({ member: e.target.value });
  }

  onChangeThought(e) {
    this.setState({ thought: e.target.value });
  }

  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  saveProposal() {
    const formData = new FormData();
    formData.append('title', this.state.title);

    if (this.props.kind === "sample") {
      formData.append('content', this.state.content);
    } else if (this.props.kind === "version") {
      formData.append('teamName', this.state.teamName);
      formData.append('member', this.state.member);
      formData.append('thought', this.state.thought);
    }

    if (this.state.file) {
      formData.append('file', this.state.file);
    }

    
    ProposalDataService.create(formData)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          teamName: response.data.teamName,
          member: response.data.member,
          thought: response.data.thought,
          content: response.data.content, // sample일 경우 content 추가
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProposal() {
    this.setState({
      id: null,
      title: "",
      content: "",
      teamName: "",
      member: "",
      thought: "",
      file: null,
      submitted: false,
      redirect: true
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/proposal" />;
    }

    return (
      <>
        <Title title={this.props.text} />
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProposal}>
                Add
              </button>
            </div>
          ) : (
            <>
              <div>
                <div className="form-group">
                  <label htmlFor="title">제목</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>

                {this.props.kind === "sample" && (
                  <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                      className="form-control"
                      id="content"
                      required
                      value={this.state.content}
                      onChange={this.onChangeContent}
                      name="content"
                    />
                  </div>
                )}

                {this.props.kind === "version" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="teamName">팀명</label>
                      <input
                        type="text"
                        className="form-control"
                        id="teamName"
                        required
                        value={this.state.teamName}
                        onChange={this.onChangeTeamName}
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
                        value={this.state.member}
                        onChange={this.onChangeMember}
                        name="member"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="thought">소감문</label>
                      <textarea
                        className="form-control"
                        id="thought"
                        required
                        value={this.state.thought}
                        onChange={this.onChangeThought}
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
                    onChange={this.onFileChange}
                    name="file"
                  />
                </div>
                <button onClick={this.saveProposal} className="btn btn-success">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
