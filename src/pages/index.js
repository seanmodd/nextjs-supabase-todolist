import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import TodoList from '../components/TodoList';

export default function IndexPage() {
  const { user } = Auth.useUser();

  return (
    <div className="h-full text-center bg-gray-300 ">
      <h1 style={{ fontFamily: 'neue-haas-grotesk-display' }}>hello</h1>
      {!user ? (
        <div className="flex items-center w-1/2 h-full p-2">
          <Auth
            supabaseClient={supabase}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center w-full h-full p-4 align-middle"
          style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
        >
          <TodoList user={supabase.auth.user()} />
          <button
            className="w-full mt-12 btn-black"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log('Error logging out:', error.message);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
