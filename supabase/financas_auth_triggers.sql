-- Corrige triggers de provisionamento em auth.users (recurso compartilhado).
-- 1) Havia DOIS triggers idênticos chamando bemestar.handle_new_user
--    (trigger_create_user_profile e on_auth_user_created). O segundo insert
--    batia em profiles_pkey duplicado e quebrava QUALQUER signup da instância.
--    Remove o duplicado (mantém on_auth_user_created).
drop trigger if exists trigger_create_user_profile on auth.users;

-- 2) Provisiona a linha em financas.profiles para cada novo usuário,
--    para o app FINANÇAS ter o perfil desde o primeiro login.
drop trigger if exists financas_on_auth_user_created on auth.users;
create trigger financas_on_auth_user_created
  after insert on auth.users
  for each row execute procedure financas.handle_new_user();
