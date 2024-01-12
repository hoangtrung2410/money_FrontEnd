import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import InforBox from '../../../components/InforBox'
import InforModal from '../../../components/InforModal'
import EditModal from '../../../components/EditModal'
import DeleteModal from '../../../components/DeleteModal'
import AddNewModal from '../../../components/AddNewModal'
import { ScrollView } from 'react-native-gesture-handler'

import { getAllRevenues } from '../../../api/main'
import { useEffect } from 'react'
import { Icon } from 'react-native-elements'

import { useAuth } from '../../../context/authContext'

function processTime(time) {
  const [year, month, day] = String(time).split('-')
  return `${day}/${month}/${year}`
}

const RevenueList = ({ refreshKey }) => {
  const [revenues, setRevenues] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [addNewModalVisible, setAddNewModalVisible] = React.useState(false)
  const [currentRevenue, setCurrentRevenue] = React.useState(null)

  useEffect(() => {
    updateRevenuesData()
  }, [refreshKey])

  const auth = useAuth()

  const token = auth.user.token
  
  const handleOpenModal = (revenue) => {
    setCurrentRevenue(revenue)
    setModalVisible(true)
  }

  const handleOpenEditModal = (revenue) => {
    setCurrentRevenue(revenue)
    setEditModalVisible(true)
  }

  const handleOpenDeleteModal = (revenue) => {
    setCurrentRevenue(revenue)
    setDeleteModalVisible(true)
  }

  const updateRevenuesData = async () => {
    setRevenues([])
    try {
      const response = await getAllRevenues(token)
      if (response.error) {return};
      if (response.data.length < 20) {
      for (let i = 0; i < response.data.length; i++) {
        setRevenues(prev => [...prev, response.data[i]])
        await new Promise(resolve => setTimeout(resolve, 4))
      }} else {
        setRevenues(response.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const resetModalData = () => {
    setCurrentRevenue(null)
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
            revenues ?
              revenues.map((revenue) => {
                return (
                  <InforBox
                    key={revenue.id}
                    name={revenue.name}
                    price={revenue.price}
                    time={processTime(revenue.time)}
                    func={() => {
                      handleOpenModal(revenue)
                    }}
                    editFunc={() => {
                      handleOpenEditModal(revenue)
                    }}
                    deleteFunc={() => {
                      handleOpenDeleteModal(revenue)
                    }}
                  />
                )
              })
              : null
          }
        </View>
      </ScrollView>
      {
        currentRevenue ?
          <InforModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            revenue={currentRevenue}
          />
          : null
      }
      {
        currentRevenue ?
          <EditModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
            revenue={currentRevenue}
            type="revenue"
            token={token}
            updateData={updateRevenuesData}
            reset={resetModalData}
          />
          : null
      }
      {
        currentRevenue ?
          <DeleteModal
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            revenue={currentRevenue}
            type="reve  nue"
            token={token}
            updateData={updateRevenuesData}
          />
          : null
      }
      <AddNewModal
        modalVisible={addNewModalVisible}
        setModalVisible={setAddNewModalVisible}
        type="revenue"
        token={token}
        updateData={updateRevenuesData}
      />
    </View>
  )
}

export default RevenueList
