import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

interface AchievementBase {
  id: string
  icon: string
  unlocked: boolean
}

const achievementBases = ref<AchievementBase[]>([
  { id: 'theme_toggle', icon: '🌓', unlocked: false },
  { id: 'language_switch', icon: '🌍', unlocked: false },
  { id: 'color_change', icon: '🎨', unlocked: false },
  { id: 'scroll_bottom', icon: '🧭', unlocked: false },
  { id: 'contact_submit', icon: '📬', unlocked: false },
  { id: 'completionist', icon: '🏆', unlocked: false },
])

const notification = ref<AchievementBase | null>(null)
const showNotification = ref(false)

const loadAchievements = () => {
  const saved = localStorage.getItem('achievements')
  if (saved) {
    const parsed = JSON.parse(saved) as string[]
    achievementBases.value.forEach(a => {
      if (parsed.includes(a.id)) a.unlocked = true
    })
  }
}

const saveAchievements = () => {
  const unlocked = achievementBases.value.filter(a => a.unlocked).map(a => a.id)
  localStorage.setItem('achievements', JSON.stringify(unlocked))
}

const unlock = (id: string) => {
  const achievement = achievementBases.value.find(a => a.id === id)
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true
    notification.value = achievement
    showNotification.value = true
    saveAchievements()
    setTimeout(() => { showNotification.value = false }, 3000)
    
    // Check for completionist (all other achievements)
    const others = achievementBases.value.filter(a => a.id !== 'completionist')
    if (others.every(a => a.unlocked)) {
      const completionist = achievementBases.value.find(a => a.id === 'completionist')
      if (completionist && !completionist.unlocked) {
        setTimeout(() => {
          completionist.unlocked = true
          notification.value = completionist
          showNotification.value = true
          saveAchievements()
          setTimeout(() => { showNotification.value = false }, 3000)
        }, 1500)
      }
    }
  }
}

loadAchievements()

export const useAchievements = () => {
  const { t } = useI18n()
  
  const achievements = computed<Achievement[]>(() => 
    achievementBases.value.map(a => ({
      ...a,
      title: t(`achievements.items.${a.id}.title`),
      description: t(`achievements.items.${a.id}.description`)
    }))
  )
  
  const notificationWithText = computed(() => {
    if (!notification.value) return null
    return {
      ...notification.value,
      title: t(`achievements.items.${notification.value.id}.title`),
      description: t(`achievements.items.${notification.value.id}.description`)
    }
  })
  
  return {
    achievements,
    notification: notificationWithText,
    showNotification,
    unlock,
    unlockedCount: () => achievementBases.value.filter(a => a.unlocked).length,
    totalCount: () => achievementBases.value.length
  }
}
