import { getUsersData } from '@/app/api/users-get';
export default async function UserManage() {
    // const usersData = await getUsersData() //Users DB에서 users Object 리스트 가져오기
    // console.log(usersData);
    return (
      <div className='user-manage'>
        {/* {usersData.map((user)=>{
            return(<div key={user.id} className='m-4 bg-gray-300'>
                {`상태 : ${user.state}`}<br/>
                {`이메일 : ${user.email}`}<br/>
                {`닉네임 : ${user.nickname}`}<br/>
                {`비밀번호 : ${user.password}`}<br/>
                {`나이 : ${user.age}`}<br/>
                {`성별 : ${user.gender}`}<br/>
                {`가입날짜 : ${user.joindate}`}<br/>
            </div>)
        })} */}
      </div>
    );
};

