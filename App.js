import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';

const optionsPerPage = [1, 2, 3];

export default function App() {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [datos, setdatos] = useState([]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);



  const Datos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setdatos(json)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    Datos();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ width: 150 }}>Nombres</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>Email</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>Ciudad</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>Compañia</DataTable.Title>
          </DataTable.Header>
          {
            datos.map((index, key) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell style={{ width: 150 }}>{index.name}</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>{index.email}</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>{index.address.city}</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>{index.company.name}</DataTable.Cell>
                </DataTable.Row>
              )
            })
          }
          <DataTable.Pagination
            page={page}
            numberOfPages={2}
            onPageChange={(page) => setPage(page)}
            label="1 of 3"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={'Rows per page'}
          />
        </DataTable>
      </ScrollView>
    </View >
  );
};

