import React from 'react'
import styled from 'styled-components'
import { FoodLabel } from '../Menu/FoodGrid'
import { pizzaRed } from '../Styles/colors'
import { Title } from '../Styles/title'
import { formatPrice } from '../Data/FoodData'
import { QuantityInput } from './QuantityInput'
import { useQuantity } from '../Hooks/useQuantity'
import { Toppings } from './Toppings'

const Dialog = styled.div`
  width: 500px;
  background-color: white;
  position: fixed;
  top: 75px;
  z-index: 5;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
`

const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`

const DialogBanner = styled.div`
  min-height: 200px;
  margin-bottom: 20px;
  ${({ img }) => `background-image: url(${img});`}
  background-position: center;
  background-size: cover;
`

const DialogBannerName = styled(FoodLabel)`
  top: 100px;
  font-size: 30px;
  padding: 5px 40px;
`

export function getPrice(order) {
  return order.quantity * order.price
}

export const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
  padding: 0 40px;
`

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 10px 0px grey;
  height: 60px;
  display: flex;
  justify-content: center;
`

export const ConfirmButton = styled(Title)`
  margin: 10px;
  color: white;
  height: 20px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: ${pizzaRed};
`

function hasToppings(food) {
  return food.section === 'Pizza'
}

function FoodDialogContainer({ openFood, setOpenFood, setOrders, orders }) {
  const quantity = useQuantity(openFood && openFood.quantity)
  function close() {
    setOpenFood()
  }

  if (!openFood) return null

  const order = {
    ...openFood,
    quantity: quantity.value,
  }

  const addToOrder = () => {
    setOrders([...orders, order])
    close()
  }

  return (
    <>
      <DialogShadow onClick={close} />
      <Dialog>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
        <DialogContent>
          <QuantityInput quantity={quantity} />
          {hasToppings(openFood) && (
            <>
              <h3> Would you like toppings? </h3>
              <Toppings />
            </>
          )}
        </DialogContent>
        <DialogFooter>
          <ConfirmButton onClick={addToOrder}>
            Add to order: {formatPrice(getPrice(order))}
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export function FoodDialog(props) {
  if (!props.openFood) return null
  return <FoodDialogContainer {...props} />
}
