from dbutils.pooled_db import PooledDB
import pymysql
# 在py中实例化一个池
POOL = PooledDB(
    creator=pymysql,    #使用链接数据库的模块
    maxconnections=6,   #连接池允许的最大链接数，0和None表示不限制
    mincached=2,        #初始化时，链接池中至少创建的空闲的链接
    maxcached=5,        #链接池中最多闲置的链接，0和None不限制
    maxshared=0,      # 链接池中最多共享的链接数量，0和None表示全部共享。
# PS: 无用，因为pymysql和MySQLdb等模块的 threadsafety都为1，所有值无论设置为多少，_maxcached永远为0，所以永远是所有链接都共享。
    blocking=True,    # 连接池中如果没有可用连接后，是否阻塞等待。True，等待；False，不等待报错
    maxusage=None,    # 一个链接最多被重复使用的次数，None表示无限制
    setsession=[],  # 可选的用于准备的SQL命令列表
    reset=True,  # 当连接返回到池时应该如何重置(False或None回滚以begin()开始的事务，为了安全起见，总是发出回滚)
    failures=None,  # 对于需要应用连接故障转移机制的
    ping=0,  # 用ping()确定何时检查连接。(0 = None = never, 1 = default =无论何时从池中获取，2 =创建游标时，4 =执行查询时，7 =总是，以及这些值的所有其他位组合)
    host='localhost',
    port=3306,
    user='root',
    password='',
    database='warehouse',
    charset='utf8'
)