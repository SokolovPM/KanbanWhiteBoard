import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-bottom: 25px;
`;

export const ErrorWrapper = styled.div`
  height: 17px;
`;

export const Input = styled.input`
  height: 50px;
  padding: 0 15px;
  min-width: 300px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #FFFFFF;
  background-color: transparent;
  ${props => props.valid ? 'color: #FFFFFF;' : 'color: #bd6969;'}

  ::placeholder {
    color: #666;
    font-size: 18px;
    font-weight: 400;
  }

  ::required {
    background: red;
  }

  &:focus {
    outline: none !important;
    background-color: #FFFFFF;
    color: #000000;
  }
`;

export const TextArea = styled.textarea`
  font-size: 16px;
  padding: 15px;
  background-color: transparent;
  color: #FFFFFF;
  width: 500px;
  height: 300px;

  &:focus {
    outline: none !important;
    background-color: #FFFFFF;
    color: #000000;
  }
`;

export const Label = styled.label`
`;

export const Error = styled.span`
  color: #FFFFFF;
  font-size: 12px;
`;

export const Button = styled.div`
  height: 50px;
  border: 2px solid #FFFFFF;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 18px;
  padding: 11px 30px;
  display: inline-block;
  text-align: center;
  width: 250px;
  cursor: pointer;
  margin-bottom: 25px;
  background-color: #676767;

  &:active {
    background-color: #333333;
  }
`;
