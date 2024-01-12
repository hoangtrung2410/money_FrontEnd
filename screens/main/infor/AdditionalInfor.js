import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { Picker } from '@react-native-picker/picker';

import { useAuth } from '../../../context/authContext'
import { getAllExpenses } from '../../../api/main'
import { getAllRevenues } from '../../../api/main'

import ToggleButton from '../../../components/ToggleButton';

async function getAllData(token) {
  let revenueData = [];
  let expenseData = [];
  let data = [];

  try {
    const responseRevenue = await getAllRevenues(token);
    {
      !responseRevenue.error ? revenueData = responseRevenue?.data : revenueData = []
    }
  } catch (error) {
    console.error('Error getting revenue data:', error);
  }

  try {
    const responseExpense = await getAllExpenses(token);
    {
      !responseExpense.error ? expenseData = responseExpense?.data : expenseData = []
    }
  } catch (error) {
    console.error('Error getting expense data:', error);
  }

  // merge two lists
  if (revenueData.length > 0 && expenseData.length > 0) {
    data = [...revenueData, ...expenseData]
  } else if (revenueData.length > 0) {
    data = revenueData
  } else if (expenseData.length > 0) {
    data = expenseData
  }
  return data;
}

function getTimeFromData(data, format) {
  const time = []
  data.map((item) => {
    const [year, month, day] = String(item.time).split('-')

    switch (format) {
      case 'day':
        time.push(`${day}/${month}/${year}`)
        break
      case 'month':
        time.push(`${month}/${year}`)
        break
      case 'year':
        time.push(`${year}`)
        break
      default:
        time.push(`Something wrong happened!`)
        break
    }
  })
  return [...new Set(time)]
}

function calculateChartData(data, format, selectedData) {
  let totalExpense = 0
  let totalRevenue = 0
  data.map((item) => {
    const [year, month, day] = String(item.time).split('-')
    switch (format) {
      case 'day':
        if (selectedData === `${day}/${month}/${year}`) {
          // check if it is expense or revenue
          if (item.amount === undefined) {
            // ko co amount -> revenue
            totalRevenue += Number(item?.price)
          } else {
            // co amount -> expense
            totalExpense += Number(item?.amount)
          }
        }
        break
      case 'month':
        if (selectedData === `${month}/${year}`) {
          // check if it is expense or revenue
          if (item.amount === undefined) {
            totalRevenue += Number(item?.price)
          } else {
            totalExpense += Number(item?.amount)
          }
        }
        break
      case 'year':
        if (selectedData === `${year}`) {
          // check if it is expense or revenue
          if (item.amount === undefined) {
            totalRevenue += Number(item?.price)
          } else {
            totalExpense += Number(item?.amount)
          }
        }
        break
      default:
        break
    }
  })
  return [totalExpense, totalRevenue]
}


const AdditionalInfo = ({ refreshKey }) => {
  const [currentData, setCurrentData] = React.useState([]);
  const [displayList, setDisplayList] = React.useState([])
  const [toggleChoice, setToggleChoice] = React.useState(null)
  const [selectedData, setSelectedData] = React.useState('')
  const [chartData, setChartData] = React.useState(null)

  // data for picker
  const [dayData, setDayData] = React.useState([])
  const [monthData, setMonthData] = React.useState([])
  const [yearData, setYearData] = React.useState([])

  useEffect(() => {
    setChartData(null)
    getData()
  }, [refreshKey])

  useEffect(() => {
    if (selectedData === '' || selectedData === null || selectedData === undefined) {
      return
    }
    if (currentData.length > 0) {
      const data = calculateChartData(currentData, toggleChoice, selectedData)
      setChartData(data)
    }
  }, [selectedData])

  const getData = async () => {
    setDisplayList([])
    setToggleChoice(null)
    const data = await getAllData(auth.user.token)
    setCurrentData(data)
    setDayData(getTimeFromData(data, 'day'))
    setMonthData(getTimeFromData(data, 'month'))
    setYearData(getTimeFromData(data, 'year'))
  }

  const auth = useAuth()

  useEffect(() => {
    switch (toggleChoice) {
      case 'day':
        setDisplayList(dayData)
        setSelectedData('')
        break
      case 'month':
        setDisplayList(monthData)
        setSelectedData('')
        break
      case 'year':
        setDisplayList(yearData)
        setSelectedData('')
        break
      default:
        break
    }
  }, [toggleChoice])

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: '#000000',
          paddingVertical: 20,
          paddingLeft: 10,
          fontWeight: 'bold',
        }}
      >Lựa chọn thời gian</Text>
      <ToggleButton func={setToggleChoice} refreshKey={refreshKey} />
      <View
        style={styles.pickerContainer}
      >
        <Picker
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedData(itemValue)
          }}
          selectedValue={selectedData}
          value={selectedData}
        >
          {
            displayList.map((item) => {
              return (
                <Picker.Item
                  style={styles.pickerItem}
                  label={item}
                  value={item}
                  key={item}
                />
              )
            })
          }
        </Picker>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        {
          (chartData && (!(chartData[0] == 0 && chartData[1] == 0))) ?
            <PieChart
              widthAndHeight={220}
              series={chartData}
              sliceColor={['#F44336', '#2196F3']}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
            :
            <Text>Không có dữ liệu</Text>
        }
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        {
          (chartData && (!(chartData[0] == 0 && chartData[1] == 0))) ?
            (<View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              {/* Text chú thích màu cho biểu đồ */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#F44336',
                  marginRight: 10,
                }}
              />
              <Text>Thu nhập</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#2196F3',
                  marginLeft: 20,
                  marginRight: 10,
                }}
              />
              <Text>Chi tiêu</Text>
            </View>)
            :
            null
        }
        {
          (chartData && (!(chartData[0] == 0 && chartData[1] == 0))) ?
            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 50,
                  color: 'black', // Adjust the color as needed
                }}
              >
                Tổng thu nhập: {chartData[0]} VND
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  color: 'black', // Adjust the color as needed
                }}
              >
                Tổng chi tiêu: {chartData[1]} VND
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 20, // You can adjust marginTop for "Dư" if needed
                  color: chartData[0] - chartData[1] < 0 ? 'red' : 'green',
                }}
              >
                {chartData[0] - chartData[1] < 0
                  ? `Nợ: ${chartData[1] - chartData[0]} VND`
                  : `Dư: ${chartData[0] - chartData[1]} VND`}
              </Text>
            </View>

            :
            null
        }
      </View>
    </View >
  );
};

export default AdditionalInfo;

const styles = StyleSheet.create({
  pickerContainer: {
    position: 'relative',
    width: "95%",
    alignSelf: 'center',
  },
  picker: {
    height: 30,
    width: "100%",
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  pickerItem: {
    height: 30,
    width: "95%",
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});