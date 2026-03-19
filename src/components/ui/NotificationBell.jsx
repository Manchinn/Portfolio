import React, { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useNotifications } from '../../hooks/usePortfolioData'
import { useTranslation } from '../../i18n/useTranslation'

const TYPE_COLORS = {
  info:    { bg: '#A0C4FF', label: 'INFO' },
  success: { bg: '#B9FBC0', label: 'OK' },
  warning: { bg: '#FFD6A5', label: 'WARN' },
}

const NotificationBell = () => {
  const { tl } = useTranslation()
  const { data: notifications, loading, markAsRead } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)

  const unread = notifications ? notifications.filter((n) => !n.read) : []
  const unreadCount = unread.length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleMarkAllRead = () => {
    if (unread.length > 0) markAsRead(unread.map((n) => n.id))
  }

  const handleClickNotification = (notification) => {
    if (!notification.read) markAsRead([notification.id])
  }

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    } catch { return iso }
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={tl({ en: 'Notifications', th: 'การแจ้งเตือน', zh: '通知' })}
        className={`relative flex items-center justify-center w-10 h-10 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${isOpen ? 'bg-black text-white' : 'bg-[#FDFFB6] text-black'}`}
      >
        <Bell size={18} strokeWidth={2.5} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-[3px] bg-[#FF6B6B] text-white text-[10px] font-black border-2 border-black flex items-center justify-center leading-none">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b-4 border-black bg-[#FF6B6B]">
            <span className="font-black text-sm uppercase tracking-wide text-black">
              {tl({ en: 'Notifications', th: 'การแจ้งเตือน', zh: '通知' })}
              {unreadCount > 0 && (
                <span className="ml-2 bg-black text-white text-[10px] font-black px-1.5 py-0.5">
                  {unreadCount} {tl({ en: 'new', th: 'ใหม่', zh: '新' })}
                </span>
              )}
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-black uppercase border-2 border-black bg-white text-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {tl({ en: 'Mark all read', th: 'อ่านทั้งหมด', zh: '全部已读' })}
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y-2 divide-black">
            {loading && !notifications && (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && (!notifications || notifications.length === 0) && (
              <div className="flex flex-col items-center justify-center py-10 px-4">
                <Bell size={32} className="text-gray-300 mb-2" />
                <p className="font-bold text-sm text-gray-500 uppercase">
                  {tl({ en: 'No notifications', th: 'ไม่มีการแจ้งเตือน', zh: '暂无通知' })}
                </p>
              </div>
            )}

            {notifications && notifications.map((n) => {
              const typeStyle = TYPE_COLORS[n.type] || TYPE_COLORS.info
              return (
                <button
                  key={n.id}
                  onClick={() => handleClickNotification(n)}
                  className={`w-full text-left px-4 py-3 transition-colors ${n.read ? 'bg-white hover:bg-gray-50' : 'bg-[#FFFDE7] hover:bg-[#FFF9C4]'}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 text-[9px] font-black px-1.5 py-0.5 border-2 border-black uppercase"
                      style={{ backgroundColor: typeStyle.bg }}
                    >
                      {typeStyle.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-black uppercase truncate ${n.read ? 'text-gray-600' : 'text-black'}`}>
                          {n.title}
                        </p>
                        {!n.read && <span className="shrink-0 w-2 h-2 rounded-full bg-[#FF6B6B] border border-black" />}
                      </div>
                      <p className={`text-xs mt-0.5 line-clamp-2 ${n.read ? 'text-gray-400' : 'text-gray-700'}`}>
                        {n.message}
                      </p>
                      <p className="text-[10px] font-mono text-gray-400 mt-1">{formatDate(n.date)}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer */}
          {notifications && notifications.length > 0 && (
            <div className="border-t-4 border-black px-4 py-2 bg-gray-50">
              <p className="text-[10px] font-mono text-gray-500 text-center uppercase">
                {notifications.length} {tl({ en: 'total', th: 'ทั้งหมด', zh: '条通知' })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
