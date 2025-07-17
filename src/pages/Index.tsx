import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface GameState {
  age: number;
  life: number;
  strength: number;
  intelligence: number;
  charisma: number;
  money: number;
  currentEvent: string;
  choices: { text: string; effect: any }[];
}

const gameEvents = [
  {
    text: "Ты проснулся в воскресенье утром. Что делать?",
    choices: [
      { text: "Заняться спортом", effect: { strength: 2, life: 1 } },
      { text: "Почитать книгу", effect: { intelligence: 2, life: 1 } },
      { text: "Встретиться с друзьями", effect: { charisma: 2, life: 1 } },
      { text: "Поспать до обеда", effect: { life: -1 } }
    ]
  },
  {
    text: "На работе предложили сложный проект. Как поступить?",
    choices: [
      { text: "Принять вызов", effect: { intelligence: 3, money: 100, life: -1 } },
      { text: "Отказаться", effect: { life: 1 } },
      { text: "Попросить помощи", effect: { charisma: 1, intelligence: 1 } }
    ]
  },
  {
    text: "Тебе предложили пойти в спортзал с коллегами",
    choices: [
      { text: "Согласиться", effect: { strength: 2, charisma: 1 } },
      { text: "Отказаться", effect: { life: -1 } },
      { text: "Предложить другую активность", effect: { charisma: 2 } }
    ]
  },
  {
    text: "Выходные. Планы на день?",
    choices: [
      { text: "Изучать новый навык", effect: { intelligence: 3, life: 1 } },
      { text: "Тренировка", effect: { strength: 3, life: 1 } },
      { text: "Социальное мероприятие", effect: { charisma: 3, life: 1 } },
      { text: "Отдых дома", effect: { life: 2 } }
    ]
  }
];

export default function Index() {
  const [gameState, setGameState] = useState<GameState>({
    age: 25,
    life: 80,
    strength: 30,
    intelligence: 40,
    charisma: 35,
    money: 1000,
    currentEvent: gameEvents[0].text,
    choices: gameEvents[0].choices
  });

  const handleChoice = (choice: { text: string; effect: any }) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Применяем эффекты
      Object.keys(choice.effect).forEach(key => {
        if (key in newState) {
          (newState as any)[key] = Math.max(0, Math.min(100, (newState as any)[key] + choice.effect[key]));
        }
      });
      
      // Увеличиваем возраст
      newState.age += 1;
      
      // Выбираем следующее событие
      const nextEvent = gameEvents[Math.floor(Math.random() * gameEvents.length)];
      newState.currentEvent = nextEvent.text;
      newState.choices = nextEvent.choices;
      
      return newState;
    });
  };

  const getSkillColor = (value: number) => {
    if (value >= 70) return 'bg-retro-mint';
    if (value >= 40) return 'bg-retro-golden';
    return 'bg-retro-orange';
  };

  const getLifeColor = (value: number) => {
    if (value >= 60) return 'bg-retro-mint';
    if (value >= 30) return 'bg-retro-golden';
    return 'bg-retro-orange';
  };

  return (
    <div className="min-h-screen bg-retro-navy p-4 font-pixel">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Заголовок */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-retro-orange mb-2 tracking-wider">
            MY LIFE
          </h1>
          <p className="text-retro-mint font-retro text-lg">
            Проживи свою жизнь заново
          </p>
        </div>

        {/* Статистика игрока */}
        <Card className="bg-retro-navy/80 border-retro-orange border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-retro-orange font-pixel text-xl flex items-center gap-2">
              <Icon name="User" size={20} />
              Возраст: {gameState.age} лет
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            
            {/* Жизнь */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-retro-mint font-retro flex items-center gap-1">
                  <Icon name="Heart" size={16} />
                  Жизнь
                </span>
                <span className="text-retro-golden font-bold">{gameState.life}%</span>
              </div>
              <div className="w-full bg-retro-navy/50 rounded-full h-3 border border-retro-orange">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getLifeColor(gameState.life)}`}
                  style={{ width: `${gameState.life}%` }}
                />
              </div>
            </div>

            {/* Навыки */}
            <div className="grid grid-cols-1 gap-3">
              {/* Сила */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-retro-mint font-retro flex items-center gap-1">
                    <Icon name="Zap" size={16} />
                    Сила
                  </span>
                  <span className="text-retro-golden font-bold">{gameState.strength}</span>
                </div>
                <div className="w-full bg-retro-navy/50 rounded-full h-2 border border-retro-orange">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getSkillColor(gameState.strength)}`}
                    style={{ width: `${gameState.strength}%` }}
                  />
                </div>
              </div>

              {/* Интеллект */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-retro-mint font-retro flex items-center gap-1">
                    <Icon name="Brain" size={16} />
                    Интеллект
                  </span>
                  <span className="text-retro-golden font-bold">{gameState.intelligence}</span>
                </div>
                <div className="w-full bg-retro-navy/50 rounded-full h-2 border border-retro-orange">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getSkillColor(gameState.intelligence)}`}
                    style={{ width: `${gameState.intelligence}%` }}
                  />
                </div>
              </div>

              {/* Харизма */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-retro-mint font-retro flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    Харизма
                  </span>
                  <span className="text-retro-golden font-bold">{gameState.charisma}</span>
                </div>
                <div className="w-full bg-retro-navy/50 rounded-full h-2 border border-retro-orange">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getSkillColor(gameState.charisma)}`}
                    style={{ width: `${gameState.charisma}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Деньги */}
            <div className="flex justify-between items-center pt-2 border-t border-retro-orange">
              <span className="text-retro-mint font-retro flex items-center gap-1">
                <Icon name="DollarSign" size={16} />
                Деньги:
              </span>
              <span className="text-retro-golden font-bold">${gameState.money}</span>
            </div>
          </CardContent>
        </Card>

        {/* Текущее событие */}
        <Card className="bg-retro-navy/80 border-retro-mint border-2">
          <CardHeader>
            <CardTitle className="text-retro-mint font-pixel text-lg flex items-center gap-2">
              <Icon name="MessageCircle" size={20} />
              Ситуация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-retro-golden font-retro text-base leading-relaxed">
              {gameState.currentEvent}
            </p>
          </CardContent>
        </Card>

        {/* Выбор действий */}
        <Card className="bg-retro-navy/80 border-retro-golden border-2">
          <CardHeader>
            <CardTitle className="text-retro-golden font-pixel text-lg flex items-center gap-2">
              <Icon name="Target" size={20} />
              Выбери действие
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gameState.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(choice)}
                className="w-full bg-retro-orange hover:bg-retro-orange/80 text-retro-navy font-retro font-bold py-3 px-4 rounded-lg border-2 border-retro-golden transition-all duration-200 hover:scale-105"
              >
                {choice.text}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Игровая информация */}
        <div className="text-center text-retro-mint font-retro text-sm opacity-80">
          <p className="flex items-center justify-center gap-1">
            <Icon name="Gamepad2" size={16} />
            Делай выборы и развивайся!
          </p>
        </div>
      </div>
    </div>
  );
}