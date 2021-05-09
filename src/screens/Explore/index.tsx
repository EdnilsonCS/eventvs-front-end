import  React  from "react"
import { FlatList } from "react-native"

import { Bold, Container, ItemContainer } from './styles'

const DATA = [
    {
        title:'Coachela'
    },
    {
        title:'Calourada 2025'
    },
    {
        title:'Rock in Rio'
    },
    {
        title:'ComicCon'
    },
    {
        title:'Oscar 2022'
    },
    {
        title:'Joao Rock'
    },
    {
        title:'Villa Mix'
    },
    {
        title:'SEMAC'
    },
    {
        title:'NLW'
    },
    {
        title:'Ibiza'
    },
    {
        title:'Carnaval Salvador'
    },
    {
        title:'Aplaudir o Sol'
    },
    {
        title:'Reverenciar a Lua'
    },
    {
        title:'OktoberFest Blumenau'
    },
    {
        title:'Cassino em Macau'
    }
]

export default function Explore(): JSX.Element {
    return (
        <Container>
            <FlatList
                data={DATA}
                keyExtractor = {(item, index) => index.toString()}
                renderItem = {({item}) => 
                <ItemContainer>
                    <Bold>{item.title}</Bold>
                </ItemContainer>
                }
            />
        </Container>
    )
}