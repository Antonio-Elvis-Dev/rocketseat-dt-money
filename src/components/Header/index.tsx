import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styled";

import logoImg from "../../assets/logo-ignite.svg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <NewTransactionButton>Nova Transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
