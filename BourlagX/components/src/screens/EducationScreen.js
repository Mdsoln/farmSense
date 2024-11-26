import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const EducationScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const categories = {
    "Climate Change Awareness": {
      climateChangeBasics: {
        title: "Introduction to Climate Change and Its Impact",
        content: "Basics of climate change and its global effects. Climate change affects different regions in various ways, such as sea level rise, droughts, and storms. Understanding the science behind climate change is crucial to addressing its impacts."
      },
      climateResilience: {
        title: "Climate Resilience and Adaptation",
        content: "What is climate resilience? How can communities build resilience? Case studies of successful adaptation strategies around the world highlight the importance of building resilience at the individual, community, and national levels."
      },
      sustainabilityPractices: {
        title: "Sustainability Practices for Daily Life",
        content: "How to reduce carbon footprints in your home, transportation, and food choices. Sustainable energy practices, such as solar power and energy-efficient appliances, are key to mitigating climate change."
      },
      indigenousKnowledge: {
        title: "Indigenous Knowledge and Nature-Based Solutions",
        content: "The role of indigenous knowledge in climate adaptation is vital. Traditional practices that enhance resilience to climate risks, along with nature-based solutions like reforestation and wetlands restoration, help combat climate change."
      }
    },
    "Climate Adaptation and Policy": {
      emergencyPreparedness: {
        title: "Emergency Preparedness and Response",
        content: "How to prepare for extreme weather events such as hurricanes, floods, and droughts. This includes steps to take before, during, and after climate-related disasters, along with building community-level emergency plans and response teams."
      },
      climateForBusinesses: {
        title: "Climate Adaptation for Businesses",
        content: "How businesses can adapt to climate risks, including supply chain disruptions and energy use. Climate risk assessments are essential for businesses to address, and best practices for building a sustainable business model are important."
      },
      climatePolicies: {
        title: "Global and Local Climate Policies",
        content: "Key international climate agreements, such as the Paris Agreement, aim to mitigate climate change and promote global collaboration. Local government climate adaptation plans impact communities, and policy plays a significant role in addressing climate resilience."
      }
    },
    "Climate Change and Innovation": {
      technologyInClimate: {
        title: "Technology and Innovation in Climate Resilience",
        content: "Technology helps communities and businesses adapt to climate change through innovations in renewable energy, water management, and climate forecasting. The role of AI and data in predicting climate risks and planning adaptive strategies is increasingly important."
      },
      climateJustice: {
        title: "Climate Justice and Equity",
        content: "Climate change disproportionately affects vulnerable populations. Climate justice focuses on ensuring that adaptation strategies are inclusive and equitable. This article explores how we can ensure that all communities have access to resilience-building opportunities."
      },
      educationalResources: {
        title: "Educational Resources and Tools",
        content: "A guide to free resources, tools, and platforms for learning about climate resilience, including courses, webinars, and online materials. Community-driven climate action programs are also an important way for people to get involved."
      },
      youthInClimate: {
        title: "The Role of Youth in Climate Action",
        content: "Inspiring stories of young climate activists and leaders, and how young people can contribute to building climate resilience in their communities. Engaging youth in local climate initiatives and advocacy efforts is crucial for long-term climate action."
      }
    },
    "Behavioral Change and Climate": {
      behavioralChange: {
        title: "Behavioral Changes for Long-Term Adaptation",
        content: "The psychology of climate change and how to motivate people to take action. Encouraging behavior change at the individual and community levels is essential for long-term adaptation."
      }
    },
    "Renewable Energy and Sustainability": {
      solarEnergy: {
        title: "Harnessing Solar Energy for a Sustainable Future",
        content: "Exploring the potential of solar power as a renewable energy source. This article discusses the benefits of solar energy, its applications in various sectors, and how it contributes to reducing carbon footprints."
      },
      windEnergy: {
        title: "The Power of Wind Energy in Climate Adaptation",
        content: "Wind energy is another key renewable source of power. Learn how wind farms work, the environmental benefits of wind energy, and its role in reducing greenhouse gas emissions."
      },
      energyStorage: {
        title: "Energy Storage Solutions for Sustainable Energy",
        content: "Energy storage systems are crucial for storing renewable energy for use during periods of low generation. This article covers the technology behind batteries, storage facilities, and their impact on energy grids."
      }
    },
    "Sustainable Agriculture": {
      regenerativeAgriculture: {
        title: "Regenerative Agriculture and Climate Adaptation",
        content: "Regenerative agriculture focuses on soil health, biodiversity, and carbon sequestration. This method helps farmers adapt to climate impacts while also mitigating greenhouse gas emissions."
      },
      waterConservation: {
        title: "Water Conservation Techniques in Agriculture",
        content: "Water scarcity is a critical challenge for farmers. Learn about techniques like drip irrigation and rainwater harvesting that conserve water while maintaining agricultural productivity."
      },
      foodSecurity: {
        title: "Building Resilience in Food Systems",
        content: "Climate change poses a threat to food security worldwide. This article examines how agricultural systems can adapt to the changing climate and ensure a stable food supply for future generations."
      }
    },
    "Green Building and Urban Development": {
      greenBuilding: {
        title: "Sustainable Architecture and Green Building Design",
        content: "Green building practices focus on using sustainable materials, energy-efficient designs, and water-saving technologies to reduce the environmental impact of buildings."
      },
      urbanResilience: {
        title: "Urban Resilience in the Face of Climate Change",
        content: "Cities are increasingly vulnerable to climate risks such as flooding and heatwaves. Learn how urban planning and resilient infrastructure can help cities adapt to these challenges."
      },
      greenCities: {
        title: "Creating Green Cities for the Future",
        content: "Urban areas are key to addressing climate change. This article looks at how cities can become more sustainable through green spaces, efficient public transport, and renewable energy adoption."
      }
    },
    "Marine Conservation and Climate": {
      oceanConservation: {
        title: "Conserving Marine Ecosystems in a Changing Climate",
        content: "The ocean plays a critical role in regulating the Earth's climate. This article explores the impacts of climate change on marine ecosystems and the importance of conservation efforts."
      },
      coralReefs: {
        title: "Protecting Coral Reefs from Climate Change",
        content: "Coral reefs are vulnerable to rising sea temperatures and ocean acidification. Learn about efforts to protect and restore coral reefs as part of global climate adaptation strategies."
      },
      sustainableFisheries: {
        title: "Sustainable Fisheries for a Healthy Ocean",
        content: "Overfishing is a major threat to marine biodiversity. This article discusses sustainable fishing practices and how they contribute to the health of the ocean ecosystem."
      }
    },
  };

  const handleSearch = (text) => {
    setSearchQuery(text.toLowerCase());
  };

  const handleBookmark = (article) => {
    // Add or remove the article from the bookmarked list
    setBookmarkedArticles(prev => {
      if (prev.includes(article)) {
        return prev.filter(item => item !== article);  // Remove if already bookmarked
      } else {
        return [...prev, article];  // Add to bookmarks
      }
    });
  };

  const filteredCategories = Object.keys(categories).filter((category) => 
    category.toLowerCase().includes(searchQuery) ||
    Object.keys(categories[category]).some((articleKey) =>
      categories[category][articleKey].title.toLowerCase().includes(searchQuery)
    )
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search articles or categories..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <Text style={styles.mainTitle}></Text>
      <ScrollView>
        <View style={styles.bookmarkSection}>
          <Text style={styles.mainTitle}>Bookmarked Articles</Text>
          {bookmarkedArticles.length > 0 ? (
            bookmarkedArticles.map((article, index) => (
              <Text key={index} style={styles.articleTitle}>{article.title}</Text>
            ))
          ) : (
            <Text>No bookmarked articles.</Text>
          )}
        </View>

        <View style={styles.gridContainer}>
          {filteredCategories.map((category) => (
            <View key={category} style={styles.categoryCard}>
              <TouchableOpacity onPress={() => setExpandedCategory(expandedCategory === category ? null : category)}>
                <Text style={styles.categoryTitle}>{category}</Text>
              </TouchableOpacity>
              {expandedCategory === category && (
                <View style={styles.articleList}>
                  {Object.keys(categories[category]).map((articleKey) => {
                    const article = categories[category][articleKey];
                    return (
                      <View key={articleKey} style={styles.articleCard}>
                        <TouchableOpacity onPress={() => setSelectedArticle(article)}>
                          <Text style={styles.articleTitle}>{article.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleBookmark(article)}>
                          <Text style={styles.bookmarkText}>
                            {bookmarkedArticles.includes(article) ? "Unbookmark" : "Bookmark"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          ))}
        </View>

        {selectedArticle && (
          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
            <Text style={styles.articleContent}>{selectedArticle.content}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  articleContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#34495e',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#2980b9',
    padding: 16,
    marginBottom: 20,
    marginHorizontal: 8,
    borderRadius: 12,
    width: '45%',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  articleList: {
    flexDirection: 'column',
  },
  articleCard: {
    backgroundColor: '#ecf0f1',
    padding: 14,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2980b9',
  },
  articleContent: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
});

export default EducationScreen;
