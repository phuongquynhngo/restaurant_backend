// Run the Seeding Script: node seed-data.js

import db from './models/index.js';
const  Category  = db.categories;
const  Item  = db.items;


const seedData = async () => {
    try {
      // Your data
      const data = {
        "categories": [
          {
            "name": "Appetizers",
            "image": "src/assets/photos/dishes/appetizers.jpg",
            "items": [
              {
                "name": "Spring Rolls",
                "description": "Crispy rolls filled with vegetables and served with sweet and sour sauce.",
                "price": 4.99,
                "image": "https://example.com/images/spring-rolls.jpg"
              },
              {
                "name": "Potstickers",
                "description": "Pan-fried dumplings filled with meat and vegetables.",
                "price": 5.99,
                "image": "https://example.com/images/potstickers.jpg"
              },
              {
                "name": "Sesame Chicken Wings",
                "description": "Deep-fried chicken wings coated with a tangy sesame glaze.",
                "price": 6.99,
                "image": "https://example.com/images/sesame-chicken-wings.jpg"
              }
            ]
          },
          {
            "name": "Main Courses",
            "image": "src/assets/photos/dishes/mainCourses.jpg",
            "items": [
              {
                "name": "Kung Pao Chicken",
                "description": "Stir-fried chicken with peanuts, vegetables, and spicy sauce.",
                "price": 11.99,
                "image": "https://example.com/images/kung-pao-chicken.jpg"
              },
              {
                "name": "Beef with Broccoli",
                "description": "Tender beef sautéed with broccoli in a savory brown sauce.",
                "price": 12.99,
                "image": "https://example.com/images/beef-with-broccoli.jpg"
              },
              {
                "name": "Sweet and Sour Pork",
                "description": "Crispy pork pieces with bell peppers, pineapple, and sweet and sour sauce.",
                "price": 10.99,
                "image": "https://example.com/images/sweet-and-sour-pork.jpg"
              }
            ]
          },
          {
            "name": "Noodles and Rice",
            "image": "src/assets/photos/dishes/noodlesAndRice.jpg",
            "items": [
              {
                "name": "Shrimp Fried Rice",
                "description": "Stir-fried rice with shrimp, vegetables, and soy sauce.",
                "price": 9.99,
                "image": "https://example.com/images/shrimp-fried-rice.jpg"
              },
              {
                "name": "Beef Chow Mein",
                "description": "Stir-fried noodles with beef, vegetables, and soy-based sauce.",
                "price": 8.99,
                "image": "https://example.com/images/beef-chow-mein.jpg"
              },
              {
                "name": "Vegetable Lo Mein",
                "description": "Stir-fried noodles with assorted vegetables in a flavorful sauce.",
                "price": 7.99,
                "image": "https://example.com/images/vegetable-lo-mein.jpg"
              }
            ]
          },
          {
            "name": "Noodles and Rice 2",
            "image": "src/assets/photos/dishes/noodlesAndRice.jpg",
            "items": [
              {
                "name": "Shrimp Fried Rice",
                "description": "Stir-fried rice with shrimp, vegetables, and soy sauce.",
                "price": 9.99,
                "image": "https://example.com/images/shrimp-fried-rice.jpg"
              },
              {
                "name": "Beef Chow Mein",
                "description": "Stir-fried noodles with beef, vegetables, and soy-based sauce.",
                "price": 8.99,
                "image": "https://example.com/images/beef-chow-mein.jpg"
              },
              {
                "name": "Vegetable Lo Mein",
                "description": "Stir-fried noodles with assorted vegetables in a flavorful sauce.",
                "price": 7.99,
                "image": "https://example.com/images/vegetable-lo-mein.jpg"
              }
            ]
          },
          {
            "name": "Noodles and Rice3",
            "image": "src/assets/photos/dishes/noodlesAndRice.jpg",
            "items": [
              {
                "name": "Shrimp Fried Rice",
                "description": "Stir-fried rice with shrimp, vegetables, and soy sauce.",
                "price": 9.99,
                "image": "https://example.com/images/shrimp-fried-rice.jpg"
              },
              {
                "name": "Beef Chow Mein",
                "description": "Stir-fried noodles with beef, vegetables, and soy-based sauce.",
                "price": 8.99,
                "image": "https://example.com/images/beef-chow-mein.jpg"
              },
              {
                "name": "Vegetable Lo Mein",
                "description": "Stir-fried noodles with assorted vegetables in a flavorful sauce.",
                "price": 7.99,
                "image": "https://example.com/images/vegetable-lo-mein.jpg"
              }
            ]
          }
        ]
      };
      
      // Insert categories and associated items
      for (const categoryData of data.categories) {
        const category = await Category.create({
          name: categoryData.name,
          image: categoryData.image
        });
  
        for (const itemData of categoryData.items) {
          await Item.create({
            name: itemData.name,
            description: itemData.description,  
            price: itemData.price,
            image: itemData.image,
            category_id: category.id,
          });
        }
      }
  
      console.log('Data seeded successfully.');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      // Close the database connection
      db.sequelize.close();
    }
  };
  
  // Seed the data
  seedData();
  