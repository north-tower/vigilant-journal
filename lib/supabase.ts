import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nfodzfcnkqemvahjiqwd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mb2R6ZmNua3FlbXZhaGppcXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwNzY2NDgsImV4cCI6MjAzNTY1MjY0OH0.WbrPVmf3cJXIk2xA3CghOXQ6uiyNEcUdVJHrPrefJos'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})