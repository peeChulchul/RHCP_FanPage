import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaFileImage } from "react-icons/fa6";
import defaultAvatar from "assets/img/etc/default_avatar.webp";
import { useDispatch } from "react-redux";
import { __modifyAuth } from "redux/modules/auth";

const Avatar = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: ${({ $avatar }) => ($avatar ? `url(${$avatar})` : `url(${defaultAvatar})`)};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const PropertyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  font-size: var(--font-md);
  color: var(--color-black);
  border-radius: 8px;
  font-weight: 600;
  background-color: var(--color-dark-pink);
  cursor: pointer;
  filter: brightness(1.05);
  path {
    fill: var(--color-black);
  }
  &:hover {
    color: var(--color-primary-alt);
    filter: brightness(1.1);
  }
  &:hover path {
    fill: var(--color-primary-alt);
  }
  #fileUpload {
    display: none;
  }
`;
export default function ModifyAvatar({ currentUser, avatar }) {
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const dispatch = useDispatch();
  const fileUploadRef = useRef();

  useEffect(() => {
    setCurrentAvatar(avatar);
  }, [avatar]);

  function onClickFileUpload() {
    fileUploadRef.current.click();
  }

  function onChangeFile(file) {
    // 파일없으면 리턴 alert띄워주는거 추가해야함
    if (!file) {
      return alert("파일을 첨부해주세요");
    }
    // 파일 확장자 검사
    const fileExtension = ["png", "jpg", "jpeg", "webp"];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension.includes(extension)) {
      dispatch(__modifyAuth({ accesToken: currentUser.accesToken, nickname: currentUser.nickname, avatar: file }));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          setCurrentAvatar(reader.result);
          resolve();
        };
      });
    } else {
      alert("png, jpg, jpeg, webp 형식만 지원합니다.");
    }
  }

  return (
    <>
      <Avatar $avatar={currentAvatar} />
      <PropertyWrapper onClick={onClickFileUpload}>
        <input
          type="file"
          onChange={(e) => {
            onChangeFile(e.target.files[0]);
          }}
          ref={fileUploadRef}
          id="fileUpload"
        />
        이미지 변경
        <FaFileImage />
      </PropertyWrapper>
    </>
  );
}
