import { StyleSheet, View } from 'react-native'
import React from 'react'

import InforBox from '../../../components/InforBox'
import InforModal from '../../../components/InforModal'
import EditModal from '../../../components/EditModal'
import DeleteModal from '../../../components/DeleteModal'
import AddNewModal from '../../../components/AddNewModal'
import { ScrollView } from 'react-native-gesture-handler'

import { getAllExpenses } from '../../../api/main'
import { useEffect } from 'react'
import { Icon } from 'react-native-elements'

import { useAuth } from '../../../context/authContext'

function processTime(time) {
  const [year, month, day] = String(time).split('-')
  return `${day}/${month}/${year}`
}
const ExpenseList = ({ refreshKey }) => {
  const [expenses, setExpenses] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [addNewModalVisible, setAddNewModalVisible] = React.useState(false)
  const [currentExpense, setCurrentExpense] = React.useState(null)

  useEffect(() => {
    updateExpensesData()
  }, [refreshKey])

  const auth = useAuth()

  const token = auth.user.token
  
  const handleOpenModal = (expense) => {
    setCurrentExpense(expense)
    setModalVisible(true)
  }

  const handleOpenEditModal = (expense) => {
    setCurrentExpense(expense)
    setEditModalVisible(true)
  }

  const handleOpenDeleteModal = (expense) => {
    setCurrentExpense(expense)
    setDeleteModalVisible(true)
  } 

  const updateExpensesData = async () => {
    setExpenses([])
    try {
      const response = await getAllExpenses(token)
      if (response.error) {return};
      if (response.data.length < 20) {
      for (let i = 0; i < response.data.length; i++) {
        setExpenses(prev => [...prev, response.data[i]])
        await new Promise(resolve => setTimeout(resolve, 4))
      }} else {
        setExpenses(response.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const resetModalData = () => {
    setCurrentExpense(null)
    setModalVisible(false)
    setEditModalVisible(false)
    setDeleteModalVisible(false)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon 
        name="add-circle" 
        size={40} 
        color="black"
        onPress={() => {
          setAddNewModalVisible(true)
        }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingBottom: 15
          }}
        >
          {
            expenses &&
            expenses.map((expense) => {
              return (
                <InforBox
                  key={expense.id}
                  name={expense.name}
                  price={expense.price}
                  time={processTime(expense.time)}
                  func={() => {
                    handleOpenModal(expense)
                  }}
                  editFunc={() => {
                    handleOpenEditModal(expense)
                  }}
                  deleteFunc={() => {
                    handleOpenDeleteModal(expense)
                  }}
                  />
              )
            })
          }
        </View>
      </ScrollView>
      {
        currentExpense ?
          <InforModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            expense={currentExpense}
          />
          : null
      }
      {
        currentExpense ?
          <EditModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
            expense={currentExpense}
            token={token}
            updateData={updateExpensesData}
            type="expense"
            reset={resetModalData}
          />
          : null
      }
      {
        currentExpense ?
          <DeleteModal
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            expense={currentExpense}
            type="expense"
            token={token}
            updateData={updateExpensesData}
          />
          : null
      }
      <AddNewModal
        modalVisible={addNewModalVisible}
        setModalVisible={setAddNewModalVisible}
        type="expense"
        token={token}
        updateData={updateExpensesData}
      />
    </View>
  )
}

export default ExpenseList

const styles = StyleSheet.create({})