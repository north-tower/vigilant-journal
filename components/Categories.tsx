import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import CategoryCard from './CategoryCard'

const Categories = () => {
  return (
    <ScrollView horizontal contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }} showsHorizontalScrollIndicator={false}
    >
       <CategoryCard id={23} imgUrl="https://images.unsplash.com/photo-1620589498198-caafe69150ca?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW1lcmdlbmN5JTIwc2VydmljZXN8ZW58MHx8MHx8fDA%3D"
         title="Emergency Servicies" rating={9.5} genre="Material" 
         short_description="Modern design features clean lines, simple forms, and a focus on 
         function and practicality. It often incorporates materials like glass, metal, and concrete." 
         dishes={[]} long={10} lat={0} />
        <CategoryCard id={13} imgUrl="https://images.unsplash.com/photo-1509732344995-2397751a0061?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9saWNlJTIwc3RhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
         title="Police Stations" rating={4.5} genre="European"  
         short_description="This style draws inspiration from classic European designs and is
          characterized by ornate details, rich colors, and formal furniture arrangements." dishes={["sushi","pizza"]}
          long={10} lat={0} />
        <CategoryCard id={24} imgUrl="https://images.unsplash.com/photo-1606613816768-63888be4a54f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVtZXJnZW5jeSUyMHNlcnZpY2VzfGVufDB8fDB8fHww"
         title="Fire Departments" rating={9.0} genre="Simple"
         short_description="Emphasizes simplicity, clean spaces, and a less is more approach, with a focus on essential elements and clutter-free interiors." dishes={[]} long={10} lat={0} />
       <CategoryCard id={32} imgUrl="https://images.unsplash.com/photo-1619025873875-59dfdd2bbbd6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGVtZXJnZW5jeSUyMHNlcnZpY2VzfGVufDB8fDB8fHww"
         title="Hospital Emergency Department" rating={4.0} genre="German" 
         short_description="Incorporates raw, unfinished elements like exposed brick, metal accents, and vintage-inspired furniture to create a utilitarian and edgy feel." dishes={[]} long={10} lat={0} />

       
         <CategoryCard id={13} imgUrl="https://plus.unsplash.com/premium_photo-1670002204213-37eba8423072?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9pc29uJTIwY29udHJvbCUyMHNlcnZpY2VzfGVufDB8fDB8fHww"
         title="Poison Control" rating={4.5} genre="American" 
         short_description="Embraces a free-spirited, eclectic mix of patterns, colors, and global influences, creating a vibrant and artistic atmosphere." dishes={[]} long={10} lat={0} />
        
        <CategoryCard id={14} imgUrl="https://images.unsplash.com/photo-1611839699701-5cd5f18c25a4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29hc3QlMjBndWFyZHN8ZW58MHx8MHx8fDA%3D"
         title="Coast Guards" rating={7.5} genre="Earthy"
         short_description=" Rustic design embraces a warm, earthy feel with natural materials, exposed wood, and a cozy, country-inspired atmosphere." 
         dishes={["Thai Rice","Greens"]} long={10} lat={0} />

<CategoryCard id={14} imgUrl="https://images.unsplash.com/photo-1644567103258-6da3857faab4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHV0aWxpdHklMjBjb21wYW5pZXN8ZW58MHx8MHx8fDA%3D"
         title="Utility Companies" rating={7.5} genre="Earthy"
         short_description=" Rustic design embraces a warm, earthy feel with natural materials, exposed wood, and a cozy, country-inspired atmosphere." 
         dishes={["Thai Rice","Greens"]} long={10} lat={0} />

         <CategoryCard id={14} imgUrl="https://plus.unsplash.com/premium_photo-1680721444667-25f7e29520ee?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFuaW1hbCUyMGNvbXBhbnl8ZW58MHx8MHx8fDA%3D"
         title="Animal Control" rating={7.5} genre="Earthy"
         short_description=" Rustic design embraces a warm, earthy feel with natural materials, exposed wood, and a cozy, country-inspired atmosphere." 
         dishes={["Thai Rice","Greens"]} long={10} lat={0} />
    
    
    </ScrollView>

      
  )
}

export default Categories

const styles = StyleSheet.create({})