import React from 'react'
import styled from 'styled-components'
import {
  DialogFooter,
  DialogContent,
  ConfirmButton,
} from '../FoodDialog/FoodDialog'

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  top: 48px;
  width: 340px;
  background-color: white;
  height: calc(100% - 48px);
  box-shadow: 4px 0px 5px 4px grey;
  z-index: 10;
  display: flex;
  flex-direction: column;
`

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`

export function Order() {
  return (
    <OrderStyled>
      <OrderContent>Your order is looking pretty empty!</OrderContent>
      <DialogFooter>
        <ConfirmButton>Checkout</ConfirmButton>
      </DialogFooter>
    </OrderStyled>
  )
}
