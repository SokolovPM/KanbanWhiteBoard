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
  border: 1px solid #509bfd;
  background-color: transparent;
  color: #509bfd;
  ${props => props.valid ? '' : 'color: #f55f5f; border-color: #f55f5f;'}
  font-family: 'Indie Flower', cursive;

  ::placeholder {
    color: #becee2;
    font-size: 18px;
    font-weight: 400;
  }

  ::required {
    background: red;
  }

  &:focus {
    outline: none !important;
    background-color: #FFFFFF;
    color: #509bfd;
  }
`;

export const TextArea = styled.textarea`
  font-size: 16px;
  padding: 15px;
  background-color: transparent;
  border: 1px solid #509bfd;
  color: #509bfd;
  width: 500px;
  height: 150px;
  font-family: 'Indie Flower', cursive;

  ${props => props.valid ? '' : 'color: #509bfd; border-color: #f55f5f;'}

  &:focus {
    outline: none !important;
    background-color: #FFFFFF;
    color: #509bfd;
  }

  ::placeholder {
    color: #becee2;
    font-size: 18px;
    font-weight: 400;
  }
`;

export const Label = styled.label`
`;

export const Error = styled.span`
  color: #f55f5f;
  font-size: 12px;
`;

export const Button = styled.button`
  height: 50px;
  border: 2px solid #509bfd;
  color: #509bfd;
  font-weight: 600;
  font-size: 18px;
  padding: 11px 30px;
  display: inline-block;
  text-align: center;
  min-width: 250px;
  cursor: pointer;
  margin-bottom: 25px;
  background-color: transparent;
  font-family: 'Indie Flower', cursive;

  &:active {
    background-color: #ecf3fd;
  }

  &:focus {outline:0;}
`;
