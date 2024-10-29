
import React, { useState, useEffect } from 'react';
import Title from "../components/Title";
import DesignDataService from "../services/design.service";

const DesignPage = () => {
    const [designs, setDesigns] = useState([]);

    // 데이터 가져오기
    const retrieveDesigns = () => {
        DesignDataService.getAll()
            .then(response => {
                setDesigns(response.data);  // 데이터 상태 업데이트
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveDesigns();  // 컴포넌트 마운트 시 데이터 가져오기
    }, []);

    // 설계서 삭제 함수
    const deleteDesign = (id) => {
        DesignDataService.delete(id)
            .then(response => {
                console.log(response.data);
                setDesigns(designs.filter(design => design.id !== id));  // 삭제된 항목 제거
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <Title title="설계서 - 작성 방법 및 예시" />

            {/* 테이블 리스트 */}
            <div style={{padding: "4px 24px"}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">팀명</th>
                            <th scope="col">팀원</th>
                            <th scope="col">날짜</th>
                            <th scope="col">작업</th> {/* 작업 열 추가 */}
                        </tr>
                    </thead>
                    <tbody>
                        {designs.map((design, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{design.title}</td>
                                <td>{design.teamName}</td>
                                <td>{design.member}</td>
                                <td>{new Date(design.createdAt).toLocaleDateString('ko-KR')}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteDesign(design.id)}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DesignPage;
