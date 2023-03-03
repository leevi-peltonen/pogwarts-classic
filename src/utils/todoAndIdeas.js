/*
NYT:
--------------------------------------------------------------------
  -Quests:
    -Create quest model
      -Name
      -Description
      -Rewards
      -Storyline?
    -Generate quests to DB
      -chatgpt
    -Create quest component
    -Update player model to include active quest
    -Update player model to include completed quests
--------------------------------------------------------------------
  -Contracts:
    -Create contract model
      -Name (Kill X Enemy)
      -Rewards
    -Update player model to include active contract
    -Generate contracts to DB
    -Create contracts component
--------------------------------------------------------------------
  -Shop:
    -Create tabs for item categories
    -Generate items to DB (other than weapons)
--------------------------------------------------------------------
  -Battle:
    -Fight screen
      -Enemy attacks
      -melvor style combat?
        -attack "progress bar" -- https://mui.com/material-ui/react-progress/
        
    -Loot system
      -Get random items from database
    -Experience/Level system ---DONE
--------------------------------------------------------------------
  -Items:
    -Create more models (potions, crafting materials)
--------------------------------------------------------------------
EI NYT MUTTA JOSKUS:
--------------------------------------------------------------------
  -Map:
    -Grid
      -Each grid cell has something:
        -resources
        -enemies
        -towns
        -dungeon entrances
        -quest starting points
    -Movement
      -Click on grid cell that is next to player location
      -Events might occur on enter
        -Enemy attacks
      -Sneak mode
        -enter grid cell by sneaking
          -prevents forced battle screen
          -penalty for sneaking
            -negative effects on player health?
            -the longer you sneak -> the more likely sneak can fail
              -fail by being spotted by enemies or traps
    -Dynamic map
      -Weather system
        -floods
      -Monster attacks
        -alert where attack occurs
    -fog-of-war
    -player location to player model
    
--------------------------------------------------------------------
  -Crafting:
    -Typical mmo crafting system
    -harvest resources around the world
    -get resoruces as loot
    -use resources to craft at crafting hotspots (towns etc)
    -enchantments and modifications
--------------------------------------------------------------------
  -Skill system
    -Mining
    -Woodcutting
    -Farming
    -Attack
    -Strength
    -Defence
*/